/// <reference types="cypress" />

//import { it } from "mocha";
import catalogo from "../../fixtures/livros.json";


describe('Funcionalidade: Busca no catálogo', () => {
   beforeEach(() => {
    cy.visit('catalog.html') // ta entendi, mas ta bagunçado, vai funcionar, mas tem que arrumar depois pq ta bem zuado
  })

  afterEach(()=>{
    cy.screenshot()

   })



    it('Deve fazer busca do livro 1984 com sucesso', () => {
      cy.get('#search-input').type('1984')
      cy.get('.card-title > .text-dark').should('contain','1984') 
    });

    it('Deve fazer busca de um livro do arquivo de massa de dados', () => {
      cy.get('#search-input').type(catalogo[1].livro)
      cy.get('.card-title > .text-dark').should('contain', catalogo[1].livro)

    });

   it.only('Deve fazer busca de um livro usando fixture', () => {
    cy.fixture('livros').then((catalogo) => {
    cy.get('#search-input').type(catalogo[2].livro)
    cy.get('.card-title > .text-dark').should('contain', catalogo[2].livro)
  })
})


});
