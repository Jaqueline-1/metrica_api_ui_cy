class CadastroPage {

  // Seletores
  campoNome() { return cy.get('#name') }
  campoEmail() { return cy.get('#email') }
  campoTelefone() { return cy.get('#phone') }
  campoSenha() { return cy.get('#password') }
  campoConfirmarSenha() { return cy.get('#confirm-password') }
  checkTermos() { return cy.get('#terms-agreement') }
  botaoCriarConta() { return cy.get('#register-btn') }

  // Métodos
  visitarCadastroPage() {
    cy.visit('register.html')
  }

  preencherCadastro(nome, email, telefone, senha, aceitarTermos = true) {
    this.campoNome().clear().type(nome)
    this.campoEmail().clear().type(email)
    this.campoTelefone().clear().type(telefone)
    this.campoSenha().clear().type(senha)
    this.campoConfirmarSenha().clear().type(senha)

    if (aceitarTermos) {
      this.checkTermos().check()
    }

    this.botaoCriarConta().click()
  }
}

export default new CadastroPage()
