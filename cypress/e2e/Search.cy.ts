// cypress/e2e/Search.cy.ts

describe("Search", () => {
  it("should search", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-test-id="header-search"]')
      .type("presencelearning")
      .find("input")
      .should("have.value", "presencelearning");
  });
});
