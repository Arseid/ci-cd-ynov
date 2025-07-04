describe("Gestion des suppressions d'utilisateurs", () => {
    const testUser = {
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
        cy.intercept('GET', `${Cypress.env('REACT_APP_SERVER_BASE_URL')}/users`, { utilisateurs: [testUser] });
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
        cy.intercept('DELETE', `${Cypress.env('REACT_APP_SERVER_BASE_URL')}/users/${testUser.id}`, { statusCode: 200 }).as('deleteUser');
        cy.visit('http://localhost:3000');
    });

    it("ne montre pas les boutons de suppression si l'utilisateur n'est pas connecté", () => {
        cy.contains('Formulaire de Login').should('exist');

        cy.contains('Liste des inscrits').should('exist');
        cy.get('ul li').should('have.length.greaterThan', 0);

        cy.get('button').contains('Supprimer').should('not.exist');
    });

    it("permet à un administrateur connecté de supprimer un utilisateur", () => {
        cy.get('[data-testid="login-form"]').within(() => {
            cy.get('input#email').type(testAdmin.email);
            cy.get('input#password').type(testAdmin.password);
            cy.get('button[type="submit"]').contains('Login').click();
        });

        cy.wait('@login');

        cy.contains(`Logged in as ${testAdmin.email}`).should('exist');

        cy.reload();

        cy.contains(`${testUser.name} ${testUser.surname} - ${testUser.email}`).should('exist');

        cy.contains('li', `${testUser.name} ${testUser.surname} - ${testUser.email}`)
            .within(() => {
                cy.contains('Supprimer').click();
            });

        cy.wait('@deleteUser');
        cy.intercept('GET', `${Cypress.env('REACT_APP_SERVER_BASE_URL')}/users`, { utilisateurs: [] });
        cy.reload();

        cy.contains(`${testUser.name} ${testUser.surname} - ${testUser.email}`).should('not.exist');
    });
});
