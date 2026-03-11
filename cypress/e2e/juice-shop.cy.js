describe('Juice Shop Tests', () => {
  beforeEach(() => {
    cy.visit('/#/register');
    cy.wait(1000);
    cy.get('body').then(($body) => {
      if ($body.find('button[aria-label="Close Welcome Banner"]').length > 0) {
        cy.get('button[aria-label="Close Welcome Banner"]').click();
      }
    });
  });

  it('Search Apple', () => {
    cy.get('mat-icon').contains('search').click();
    cy.get('input[id="mat-input-1"]').type('Apple{enter}');
    cy.get('mat-card').first().should('contain', 'Apple');
  });

  it('Register Users', () => {
    const suffix = Date.now();
    cy.fixture('registrationData.json').then((users) => {
      users.forEach((user) => {
        cy.visit('/#/register');
        cy.get('#emailControl').type(suffix + user.email);
        cy.get('#passwordControl').type(user.password);
        cy.get('#repeatPasswordControl').type(user.password);
        cy.get('mat-select[name="securityQuestion"]').click();
        cy.get('mat-option').contains(user.question).click();
        cy.get('#securityAnswerControl').type(user.answer);
        cy.get('#registerButton').click();
        cy.url().should('include', '/login');
      });
    });
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Record test', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.mat-search_icon-search').click();
    cy.get('#mat-input-1').clear('re');
    cy.get('#mat-input-1').type('record{enter}');
    /* ==== End Cypress Studio ==== */
  });
});
