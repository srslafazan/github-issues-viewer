// cypress/e2e/Header.cy.ts

describe("Header", () => {
  it("should have components and text", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-test-id="header-title"]').should(
      "have.text",
      "Presence Learning"
    );
    cy.get('[data-test-id="header-subtitle"]').should(
      "have.text",
      "GitHub Issue Viewer"
    );
    cy.get('[data-test-id="header-logo"]')
      .invoke("attr", "src")
      .should(
        "eq",
        "https://presencelearning.com/wp-content/themes/presence/favicons/favicon.svg"
      );
  });
});
