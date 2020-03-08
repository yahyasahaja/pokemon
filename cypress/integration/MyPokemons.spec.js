describe('My pokemon list', () => {
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
      'fixture:bulbasaur.json'
    );

    cy.visit('/pokemons');
    cy.get('[data-testid="pokemon-card"]')
      .first()
      .as('first-card')
      .click();

    cy.window().then(win => {
      win.utils.localforage.clear();
      win.utils.calculateCatchPokemon = () => {
        return true;
      };
      cy.get('[data-testid="catch-button"]').click();
      cy.wait(3000);
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
      cy.go('back');
      cy.get('[data-testid="routers"]')
        .eq(1)
        .click({ force: true });
      cy.get('[data-testid="pokemon-card"]').should('exist');
      cy.get('@first-mypokemon-card')
        .find('[data-testid="pokemon-card-name"]')
        .then(el => {
          const name = el.text();
          expect(name).to.equal('bulbasaur');
        });
    });
  });

  it('Should be able to clear pokemon', () => {
    cy.get('[data-testid="clear-my-pokemons"]').click();
    cy.get('[data-testid="my-pokemons-empty"]').should('exist');
    cy.window().then(win => win.utils.localforage.clear());
  });
});
