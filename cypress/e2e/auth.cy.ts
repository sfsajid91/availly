describe('Authentication and authorization', () => {
    before(() => {
        cy.exec('pnpm prisma migrate reset --force');
    });

    it('should redirect to the login page', () => {
        cy.visit('/businesses');

        cy.url().should('include', '/login');
    });

    it('should throw invalid credentials error', () => {
        cy.visit('/login');

        cy.fixture('user').then((user) => {
            cy.get('input[name="email"]').type(user.email);
            cy.get('input[name="password"]').type(user.password);
        });

        cy.get('button[type="submit"]').contains('Login').click();

        cy.get('div').contains('Invalid credentials').should('exist');
    });

    it('should register a user', () => {
        cy.visit('/registration');

        cy.fixture('user').then((user) => {
            cy.get('input[name="name"]').type(user.name);
            cy.get('input[name="email"]').type(user.email);
            cy.get('input[name="password"]').type(user.password);
            cy.get('input[name="confirmPassword"]').type(user.password);
        });

        cy.get('button[type="submit"]').contains('Register').click();

        cy.get('div')
            .contains('Check your email for verification link.')
            .should('exist');
    });

    it('should throw user already exists error', () => {
        cy.visit('/registration');

        cy.fixture('user').then((user) => {
            cy.get('input[name="name"]').type(user.name);
            cy.get('input[name="email"]').type(user.email);
            cy.get('input[name="password"]').type(user.password);
            cy.get('input[name="confirmPassword"]').type(user.password);
        });

        cy.get('button[type="submit"]').contains('Register').click();

        cy.get('div')
            .contains('User already exists with this email.')
            .should('exist');
    });

    it('should throw unverified email error', () => {
        cy.visit('/login');
        cy.fixture('user').then((user) => {
            cy.get('input[name="email"]').type(user.email);
            cy.get('input[name="password"]').type(user.password);
        });

        cy.get('button[type="submit"]').contains('Login').click();

        cy.get('div').contains('Email is not verified').should('exist');
    });

    it('should login a user', () => {
        cy.fixture('user').then((user) => {
            cy.task('updateEmailVerified', user.email);
        });

        cy.fixture('user').then((user) => {
            cy.login(user.email, user.password);
        });

        cy.visit('/login');
        cy.get('button').contains('Logout').should('exist');
        cy.fixture('user').then((user) => {
            cy.get('p').contains(`Hello: ${user.name}`).should('exist');
        });

        cy.url().should('eq', Cypress.config().baseUrl + '/businesses');
    });
});
