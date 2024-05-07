// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

Cypress.Commands.add('login', (email, password) => {
    cy.session(
        email,
        () => {
            cy.visit('/login');

            cy.get('input[name="email"]').type(email);
            cy.get('input[name="password"]').type(password);

            cy.get('button[type="submit"]').contains('Login').click();
            cy.url().should('eq', Cypress.config().baseUrl + '/businesses');
        },
        {
            validate: () => {
                cy.request('/api/auth/session')
                    .its('body')
                    .then((body) => {
                        if (body.user.email === email) {
                            return true;
                        }
                        return false;
                    });
            },
        }
    );
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//     namespace Cypress {
//         interface Chainable {
//             login(email: string, password: string): Chainable<void>;
//             drag(
//                 subject: string,
//                 options?: Partial<TypeOptions>
//             ): Chainable<Element>;
//             dismiss(
//                 subject: string,
//                 options?: Partial<TypeOptions>
//             ): Chainable<Element>;
//             visit(
//                 originalFn: CommandOriginalFn,
//                 url: string,
//                 options: Partial<VisitOptions>
//             ): Chainable<Element>;
//         }
//     }
// }

export {};
