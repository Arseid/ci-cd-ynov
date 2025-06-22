describe("Gestion des suppressions d'utilisateurs", () => {
    const adminEmail = Cypress.env('TEST_ADMIN_EMAIL');
    const adminPassword = Cypress.env('TEST_ADMIN_PASSWORD');

    beforeEach(() => {
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
            cy.get('input#email').type(adminEmail);
            cy.get('input#password').type(adminPassword);
            cy.get('button[type="submit"]').contains('Login').click();
        });

        cy.contains(`Logged in as ${adminEmail}`).should('exist');

        cy.get('ul li').should('have.length.greaterThan', 0);

        cy.get('button').contains('Supprimer').first().click();

        cy.wait(500);

        cy.get('ul li').should('not.exist');
    });
});
