describe('Création de post', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('doit permettre la création d\'un post', () => {
        cy.contains('h2', 'Créer un Post').scrollIntoView().should('be.visible');
        cy.get('[data-testid="post-form"]').within(() => {
            cy.get('input[name="title"]').type('Mon premier post');
            cy.get('textarea[name="content"]').type('Ceci est le contenu du post.');
            cy.get('input[name="author"]').type('Jean Dupont');
            cy.contains('button', 'Créer').should('not.be.disabled').click();
        });
        cy.contains('Post creation successful!').should('be.visible');
        cy.contains('h2', 'Liste des Posts').scrollIntoView().should('be.visible');
        cy.get('ul').should('contain', 'Mon premier post');
        cy.get('ul').should('contain', 'Ceci est le contenu du post.');
        cy.get('ul').should('contain', 'Jean Dupont');
    });
});
