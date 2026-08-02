/// <reference types="cypress" />

describe('Testes da Funcionalidade Catálogo de Livros', () => {

let token
beforeEach(() => {
    cy.geraToken('admin@biblioteca.com', 'admin123').then(tkn => {
        token = tkn
    })
});

    // Objetivo: Verificar que a API retorna lista de livros com paginação e filtros funcionando
    // Validar que filtros por categoria e autores funcionam corretamente
     it('GET - Deve listar livros com filtros e paginação', () => {
    cy.api({
        method: 'GET',
        url: 'books',
        qs: {
            category: 'Ficção Clássica',
            author: 'Machado de Assis',
            available: true,
            limit: 20,
            offset: 0,
            orderBy: 'title',
            order: 'ASC'
        }
    }).should(response => {
        expect(response.status).to.equal(200)
        expect(response.body.books).to.be.an('array')
        expect(response.body).to.have.property('pagination')
        expect(response.body).to.have.property('filters')
    })
})
    // Objetivo: Validar que é possível obter detalhes de um livro específico pelo ID
    // Verificar que todos os campos do livro são retornados corretamente
   it('GET - Deve obter detalhes de um livro específico', () => {
    cy.api({
        method: 'GET',
        url: 'books',
        qs: {
            limit: 1
        }
    }).then(listResponse => {
        expect(listResponse.status).to.equal(200)
        expect(listResponse.body.books).to.be.an('array')

        const bookId = listResponse.body.books[0].id

        cy.api({
            method: 'GET',
            url: `books/${bookId}`
        }).should(response => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('book')
            expect(response.body.book).to.have.property('id')
            expect(response.body.book).to.have.property('title')
            expect(response.body.book).to.have.property('author')
            expect(response.body.book).to.have.property('description')
            expect(response.body.book).to.have.property('category')
        })
    })
})

    // Objetivo: Validar que um novo livro é adicionado com sucesso ao catálogo
    // Verificar que apenas admin pode adicionar novos livros (validação de permissão)
     it('Deve cadastrar um livro com sucesso', () => {
        let titulo = `O Mundo ${Date.now()}`

        cy.api({
            method: 'POST',
            url: 'books',
            headers: {
                'Authorization': token
            },
            body: {
                title: titulo,
                author: 'Jaqueline Rosa',
                description: 'Livro criado sobre a vida.',
                category: 'Reflexão',
                editor: 'Editora PB',
                language: 'Português',
                publication_year: 2024,
                pages: 250,
                format: 'Físico',
                total_copies: 4,
                available_copies: 4
            }
        }).should(response => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Livro criado com sucesso.')
        })
     })


    // Objetivo: Garantir que dados inválidos são rejeitados ao adicionar um livro
    // Validar mensagens de erro apropriadas para dados faltantes ou incorretos
    it('Deve rejeitar livro com dados inválidos', () => {
        cy.api({
            method: 'POST',
            url: 'books',
            headers: {
                'Authorization': token
            },
            body: {
                title: '',
                author: 'Jaqueline Rosa',
                description: 'Livro criado sobre a vida.',
                category: 'Reflexão',
                editor: 'Editora PB',
                language: 'Português',
                publication_year: 2024,
                pages: 250,
                format: 'Físico',
                total_copies: 4,
                available_copies: 4
            },
            failOnStatusCode: false
        }).should(response => {
            expect(response.status).to.equal(400)
            expect(response.body).to.have.property('message')
        })
    });

    // Objetivo: Validar que um livro pode ser atualizado com sucesso
    // Verificar que apenas admin pode atualizar livros (validação de permissão)
    it('PUT - Deve atualizar um livro previamente cadastrado', () => {
       it('Deve atualizar um livro com sucesso', () => {
        cy.api({
            method: 'PUT',
            url: 'books/31',
            headers: { 'Authorization': token },
            body: {
                title: 'O Mundo Alterado',
                author: 'Jaqueline Rosa',
                description: 'Livro atualizado durante o teste.',
                category: 'Reflexão',
                editor: 'Editora PB',
                language: 'Português',
                publication_year: 2025,
                pages: 300,
                format: 'Físico',
                total_copies: 5,
                available_copies: 5
            }
        }).should(response => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal('Livro atualizado com sucesso.')
        })
          })
          
    });

    // Objetivo: Validar que um livro pode ser removido do catálogo
    // Verificar que apenas admin pode deletar livros (validação de permissão)
  it('DELETE - Deve deletar um livro previamente cadastrado', () => {
    let titulo = `Livro para deletar ${Date.now()}`

    cy.cadastrarLivro(token, titulo).then(bookId => {
        cy.api({
            method: 'DELETE',
            url: `books/${bookId}`,
            headers: {
                'Authorization': token
            }
        }).should(response => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal("Livro deletado com sucesso.")
        })
    })
})
});
