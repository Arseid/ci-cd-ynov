describe('Formulaire d\'inscription', () => {
    const user = {
        name: 'John',
        surname: 'Doe',
        email: `john.doe.${Date.now()}@example.com`,
        birthdate: '1990-01-01',
        city: 'Paris',
        postal_code: '75000'
    };

    beforeEach(() => {
        cy.intercept('GET', `${Cypress.env('REACT_APP_SERVER_BASE_URL')}/users`, { utilisateurs: [] });
        cy.intercept('GET', `${Cypress.env('REACT_APP_POSTS_SERVER_BASE_URL')}/posts`, []);
        cy.intercept('POST', `${Cypress.env('REACT_APP_SERVER_BASE_URL')}/users`, { statusCode: 201 }).as('createUser');;
        cy.visit('http://localhost:3000');
    });

    it('remplit le formulaire, soumet, voit le message de succès, et trouve le nouvel utilisateur', () => {
        cy.get('input[name="name"]').type(user.name);
        cy.get('input[name="surname"]').type(user.surname);
        cy.get('input[name="email"]').type(user.email);
        cy.get('input[name="birthdate"]').type(user.birthdate);
        cy.get('input[name="city"]').type(user.city);
        cy.get('input[name="postal_code"]').type(user.postal_code);

        cy.contains('button[type="submit"]', 'Sauvegarder').should('not.be.disabled');

        cy.contains('button', 'Sauvegarder').click();

        cy.wait('@createUser');

        cy.contains('Registration successful!').should('be.visible');

        cy.intercept('GET', '/users', { utilisateurs: [
            { id: 1, name: user.name, surname: user.surname, email: user.email, birthdate: user.birthdate, city: user.city, postal_code: user.postal_code }
        ] });

        cy.reload();

        cy.contains(`${user.name} ${user.surname} - ${user.email}`).should('exist');
    });
});

describe('Formulaire d\'inscription - validation', () => {
    it('affiche les messages d\'erreur et le Toastr si des champs sont invalides', () => {
        cy.visit('http://localhost:3000');
        cy.intercept('GET', `${Cypress.env('REACT_APP_SERVER_BASE_URL')}/users`, { utilisateurs: [] });
        cy.intercept('GET', `${Cypress.env('REACT_APP_POSTS_SERVER_BASE_URL')}/posts`, []);

        cy.get('input[name="name"]').type('1234');
        cy.get('input[name="surname"]').type('123');
        cy.get('input[name="email"]').type('email-invalide');
        cy.get('input[name="birthdate"]').type('2020-01-01');
        cy.get('input[name="city"]').type('$$$');
        cy.get('input[name="postal_code"]').type('abcde');

        cy.contains('button', 'Sauvegarder').click();

        cy.contains('Nom invalide.').should('be.visible');
        cy.contains('Prénom invalide.').should('be.visible');
        cy.contains('Email invalide.').should('be.visible');
        cy.contains('Vous devez avoir au moins 18 ans.').should('be.visible');
        cy.contains('Ville invalide.').should('be.visible');
        cy.contains('Code postal invalide.').should('be.visible');

        cy.contains('Formulaire invalide. Veuillez corriger les erreurs.').should('be.visible');

        cy.contains('1234').should('not.exist');
    });
});
