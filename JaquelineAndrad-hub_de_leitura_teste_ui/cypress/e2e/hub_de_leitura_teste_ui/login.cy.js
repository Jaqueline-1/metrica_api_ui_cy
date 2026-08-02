/// <reference types="cypress" />
  import user from "../../fixtures/usuario.json"

describe('Funcionalidade login', () => {
  beforeEach(() => {
    cy.visit('/login.html') //onde ta esse arquivo?
  });

  afterEach(()=>{
    cy.screenshot()

   })

    it('Fazer login com sucesso - usando testes customizado', () => {
         cy.login('usuario@teste.com','user123')

    });

    it('Fazer login Admin com sucesso - usando testes customizado', () => {
         cy.login('admin@biblioteca.com','admin123')

    });
   
   
    it('Fazer login Admin com sucesso - usando importação de massa de dados', () => {
         cy.login(user.email,user.senha) 
   
    });




});