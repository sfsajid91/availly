describe('Navigation', () => {
    it('should navigate to the login page', () => {
        cy.visit('/');
        cy.get('a').contains('Login').click();
        cy.url().should('include', '/login');
    });

    it('should navigate to the register page', () => {
        cy.visit('/');
        cy.get('a').contains('Register').click();
        cy.url().should('include', '/registration');
    });

    it('should navigate to the home page', () => {
        cy.visit('/login');
        // first find a img tag with the alt text containing 'logo' not case sensitive and click the first one
        cy.get('img[alt*="logo" i]').first().click();
        cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
});
