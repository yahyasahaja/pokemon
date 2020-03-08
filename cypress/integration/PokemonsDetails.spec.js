describe('Pokemon details', () => {
  it('Should be able to go to pokemon details from pokemon list', () => {
    cy.server();
    cy.route(
      'GET',
      'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20',
      'fixture:pokemons.json'
    );
    cy.route(
      'GET',
      'https://pokeapi.co/api/v2/pokemon/bulbasaur',
      'fixture:balbasaur.json'
    );
    cy.visit('/pokemons');
    cy.get('[data-testid="pokemon-card"]')
      .first()
      .as('first-card');

    cy.window().then(win => win.utils.localforage.clear());
    cy.get('@first-card')
      .find('[data-testid="pokemon-card-name"]')
      .then(el => {
        const name = el.text();
        el.click();
        cy.window().then(win => {
          expect(win.location.pathname).to.equal(`/pokemons/${name}`);
        });
      });
  });

  it('Should be able to catch', () => {
    cy.window().then(win => {
      win.utils.localforage.clear();
      win.utils.calculateCatchPokemon = () => {
        return false;
      };
      cy.get('[data-testid="catch-button"]')
        .should('exist')
        .then(() => {
          win.utils.calculateCatchPokemon = () => {
            return true;
          };
          cy.get('[data-testid="catch-button"]').click();
          cy.get('[data-testid="overlay-loading"]').should('exist');
          cy.get('.MuiAlert-message, .MuiSnackbarContent-message').should(
            'exist'
          );
          cy.get('[data-testid="pokemon-details-has-owned-message"]').should(
            'not.exist'
          );
          cy.get('[data-testid="pokemon-card"]')
            .first()
            .find('[data-testid="pokemon-card-owned"]')
            .should('exist');
        });
    });
  });

  it('Should be able to set nickname', () => {
    cy.get('[data-testid="pokemon-card"]')
      .first()
      .as('first-mypokemon-card')
      .find('[data-testid="pokemon-card-nickname"]')
      .as('nickname')
      .contains("Haven't named");
    const nickname = 'New nickname';
    cy.get('[data-testid="input-nickname"]').type(nickname);
    cy.get('[data-testid="save-nickname-button"]').click();
    cy.get('@nickname').should('contain', nickname);
    cy.get('.MuiAlert-message').should('exist');
  });

  it('Should be able to release', () => {
    cy.get('[data-testid="release-button"]').click();
    cy.get('.MuiAlert-message').should('exist');
    cy.get('[data-testid="pokemon-card"]')
      .first()
      .find('[data-testid="pokemon-card-nickname"]')
      .should('not.exist');
    cy.window().then(win => win.utils.localforage.clear());
  });
});
