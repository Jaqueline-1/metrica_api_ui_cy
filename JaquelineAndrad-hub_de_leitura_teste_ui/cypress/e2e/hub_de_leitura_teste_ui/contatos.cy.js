describe('Fucionalidades:Contato', () => {
  beforeEach(() => { 
      cy.visit('http://localhost:3000/index.html')
  })

  afterEach(()=>{
    cy.screenshot()

   })

  
  it('Deve preencher o formulério corretamente', () => {
    //cy.visit('http://localhost:3000/index.html')
    cy.get('[name="name"]').type('Jaque')
    cy.get('[name="email"]').type('jaq@email.com')
    cy.get('[name="subject"]').select('Parcerias')
    cy.get('[name="message"]').type('mensagem')
    cy.get('#btn-submit').click()
    cy.get('#alert-container').should('exist')
  })
  

  it('Deve validar mensagem de erro ao enviar sem preencher o nome', () => {
    //cy.visit('http://localhost:3000/index.html')
    cy.get('[name="name"]').type('123')
    cy.get('[name="email"]').type('jaq@email.com')
    cy.get('[name="subject"]').select('Parcerias')
    cy.get('[name="message"]').type('mensagem')
    cy.get('#btn-submit').click()
    cy.get('#alert-container').should('exist')
  })




  it('Deve validar mensagem de erro ao enviar sem preencher o email ', () => {
    //cy.visit('http://localhost:3000/index.html')
    cy.get('[name="name"]').type('Jaque')
    cy.get('[name="email"]').clear()
    cy.get('[name="subject"]').select('Parcerias')
    cy.get('[name="message"]').type('mensagem')
    cy.get('#btn-submit').click()
    cy.get('#alert-container').should('exist')

  })


  it('Deve validar mensagem de erro ao enviar sem selecionar o assunto', () => {
    //cy.visit('http://localhost:3000/index.html')
    cy.get('[name="name"]').type('Jaque')
    cy.get('[name="email"]').type('jaque@email.com')
    //cy.get('[name="subject"]').select('')
    cy.get('[name="message"]').type('mensagem')
    cy.get('#btn-submit').click()
    cy.get('#alert-container').should('contain','Por favor, selecione o Assunto')

  })


  it('Deve validar mensagem de erro ao não preencher a mensagem', () => {
    cy.get('[name="message"]').clear()
    cy.get('[name="name"]').type('nome');
    cy.get('[name="email"]').type('email@provedor.com');
    cy.get('[name="subject"]').select('Dúvidas Gerais');
    cy.get('#btn-submit').click()
    cy.get('#alert-container').should('contain', 'Por favor, escreva sua Mensagem.') 
  })
})