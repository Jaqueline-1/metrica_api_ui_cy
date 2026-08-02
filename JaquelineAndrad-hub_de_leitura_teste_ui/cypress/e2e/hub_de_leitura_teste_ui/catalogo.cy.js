/// <reference types="cypress" />

describe('Funcionalidade: Catálogo de livros', () => {

    beforeEach(() => {
        cy.visit('catalog.html')
    })

    afterEach(()=>{
    cy.screenshot()

   })

    it('Deve clicar no botão adicionar a cesta', () => {
     cy.get(':nth-child(4) > .card > .card-body > .mt-auto > .d-grid > .btn-primary').click()
     cy.get('#cart-count').should('contain', 1 )
   
    })

    it('Deve clicar em todos os botões adicionar a cesta', () => {
     cy.get('.btn-primary').click({ multiple: true })
    })

    it('Deve clicar no primeiro bontão adicionar a cesta' , () =>{
     cy.get('.btn-primary').first().click()
    }) 


     it('Deve clicar no ultimo bontão adicionar a cesta' , () =>{
     cy.get('.btn-primary').last().click()
    })

       it.skip('Deve clicar no quarto bontão adicionar a cesta' , () =>{
     cy.get('.btn-primary').eq(3).click()
    })

       it('Deve clicar no segundo bontão adicionar a cesta' , () =>{
      cy.get('.btn-primary').eq(1).click()
      cy.contains('1984').should('exist')
    })
       

      it('Deve clicar no nome do livro e direcionar para a tela do  livro' , () =>{
       cy.get('#search-input').type('dom casmurro');
       cy.contains('Dom Casmurro').click()
       cy.url().should('include','book-details')
       cy.get('#add-to-cart-btn').click()
       cy.get('#alert-container')
         .should('be.visible')
         .and('contain.text', 'Livro adicionado à cesta com sucesso!')
       
       
       
       }) 
     
      })

