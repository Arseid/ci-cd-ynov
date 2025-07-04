describe('Connexion administrateur', () => {

    const testAdmin = {
        email: "admin@test.com",
        password: "admin123",
        fake_token: "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJkYXRhIjpbeyJlbWFpbCI6ImFkbWluQHRlc3QuY29tIn1dfQ."
    };

    beforeEach(() => {
        cy.intercept('GET', `${Cypress.env('REACT_APP_SERVER_BASE_URL')}/users`, { utilisateurs: [] });
        cy.intercept('GET', `${Cypress.env('REACT_APP_POSTS_SERVER_BASE_URL')}/posts`, []);
        cy.intercept('POST', `${Cypress.env('REACT_APP_SERVER_BASE_URL')}/login`, (req) => {
            if (req.body.email === testAdmin.email && req.body.password === testAdmin.password) {
                req.reply({
                    statusCode: 200,
                    body: testAdmin.fake_token
                });
            } else {
                req.reply({ statusCode: 401, body: { message: 'Email or password is incorrect.' } });
            }
        }).as('login');
        cy.visit('http://localhost:3000');
    });

    it('doit permettre à un admin de se connecter et d’afficher son email', () => {
        cy.get('[data-testid="login-form"]').within(() => {
            cy.get('input#email').type(testAdmin.email);
            cy.get('input#password').type(testAdmin.password);
            cy.get('button[type="submit"]').contains('Login').click();
        });

        cy.wait('@login');

        cy.contains(`Logged in as ${testAdmin.email}`).should('be.visible');
    });

    it('affiche un message d’erreur si les identifiants sont incorrects', () => {
        cy.get('[data-testid="login-form"]').within(() => {
            cy.get('input#email').type('lol@test.com');
            cy.get('input#password').type('hahaha');
            cy.get('button[type="submit"]').contains('Login').click();
        });

        cy.wait('@login');

        cy.contains('Email or password is incorrect.').should('be.visible');
    });
});
