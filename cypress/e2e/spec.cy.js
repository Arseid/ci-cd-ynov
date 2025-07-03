describe('Home page spec', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('doit afficher le titre principal des users', () => {
        cy.contains('h1', 'Users Section').should('be.visible');
    });

    it('doit afficher le compteur de nombre de users', () => {
        cy.contains(/user\(s\) already registered/i).should('be.visible');
    });

    it("doit afficher le formulaire d'inscription", () => {
        cy.contains('h2', "Formulaire d'inscription").should('be.visible');
        cy.get('[data-testid="registration-form"]').within(() => {
            cy.get('input[name="name"]').should('exist');
            cy.get('input[name="surname"]').should('exist');
            cy.get('input[name="email"]').should('exist');
            cy.get('input[name="birthdate"]').should('exist');
            cy.get('input[name="city"]').should('exist');
            cy.get('input[name="postal_code"]').should('exist');
            cy.contains('button', 'Sauvegarder').should('be.disabled');
        });
    });

    it('doit afficher le formulaire de login', () => {
        cy.contains('h2', 'Formulaire de Login').should('be.visible');
        cy.get('[data-testid="login-form"]').within(() => {
            cy.get('input#email').should('have.attr', 'type', 'email');
            cy.get('input#password').should('have.attr', 'type', 'password');
            cy.contains('button', 'Login').should('be.visible');
        });
    });

    it('doit afficher la section Liste des inscrits', () => {
        cy.contains('h2', 'Liste des inscrits').should('be.visible');
        cy.get('ul').should('exist');
    });

    it('doit afficher le titre principal des posts', () => {
        cy.contains('h1', 'Posts Section').should('be.visible');
    });

    it('doit afficher le compteur de nombre de posts', () => {
        cy.contains(/post\(s\) already registered/i).should('be.visible');
    });

    it('doit afficher le formulaire de création de post', () => {
        cy.contains('h2', 'Créer un Post').should('be.visible');
        cy.get('[data-testid="post-form"]').within(() => {
            cy.get('input[name="title"]').should('exist');
            cy.get('textarea[name="content"]').should('exist');
            cy.get('input[name="author"]').should('exist');
            cy.contains('button', 'Créer').should('be.disabled');
        });
    });

    it('doit afficher la section Liste des posts', () => {
        cy.contains('h2', 'Liste des Posts').should('be.visible');
        cy.get('ul').should('exist');
    });
});
