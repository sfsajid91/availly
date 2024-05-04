// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
    interface Chainable {
        login(email: string, password: string): Chainable<void>;
    }
}
