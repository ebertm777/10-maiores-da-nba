/// <reference types="Cypress" />

context('Waiting', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('cy.wait() - wait for a specific amount of time', () => {
    cy.get('.main-title').contains('Repositório base')
  })
})
