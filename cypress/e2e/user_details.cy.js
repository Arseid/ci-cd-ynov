describe("Affichage des détails d'un utilisateur", () => {

    const testUser = {
        id: 1,
        name: "Temp",
        surname: "Userdelete",
        email: "temp.user@example.com",
        birthdate: "2000-01-01",
        city: "Testville",
        postal_code: "12345"
    };

    const testAdmin = {
        email: "admin@test.com",
        password: "admin123",
        fake_token: "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJkYXRhIjpbeyJlbWFpbCI6ImFkbWluQHRlc3QuY29tIn1dfQ."
    };

    beforeEach(() => {
        cy.intercept('GET', '/users', { utilisateurs: [testUser] });
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

    it("n'affiche pas les détails si l'utilisateur n'est pas connecté", () => {
        cy.contains('Liste des inscrits').should('be.visible');

        cy.get('ul > li').first().click();
        cy.contains("Détails de l'utilisateur").should('not.exist');
    });

    it("affiche les détails si l'utilisateur est connecté", () => {
        cy.get('[data-testid="login-form"]').within(() => {
            cy.get('input#email').type(testAdmin.email);
            cy.get('input#password').type(testAdmin.password);
            cy.get('button[type="submit"]').contains('Login').click();
        });

        cy.wait('@login');

        cy.contains('Logged in as').should('be.visible');
        cy.contains('Liste des inscrits').should('be.visible');

        cy.get('ul > li').first().click();
        cy.contains("Détails de l'utilisateur").should('be.visible');
    });
});
