/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("to-do app test", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("http://localhost:3000");
  });
  it("should add a new todo", () => {
    cy.get("#new-todo").type("Buy milk{enter}");
    cy.get("#todo-list").contains("Buy milk");
  });

  it("should mark a todo as completed", () => {
    cy.get("#new-todo").type("Buy milk{enter}");
    cy.get("#todo-list li").contains("Buy milk").parent().parent().find('input[type="checkbox"]').check();
    cy.get("#todo-list li").contains("Buy milk").parent().parent().find('input[type="checkbox"]').should("be.checked");
  });

  it("should delete a todo", () => {
    cy.get("#new-todo").type("Buy milk{enter}");
    cy.get("#todo-list li").contains("Buy milk").parent().parent().parent().find(".btn-delete").click();
    cy.get("#todo-list").should("not.contain", "Buy milk");
  });
});
