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

    cy.window().then(win => win.utils.localforage.clear())
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
      win.utils.localforage.clear()
      cy.get('[data-testid="catch-button"]').click();
      cy.get('[data-testid="overlay-loading"]').should('exist');
      cy.get('.MuiAlert-message').then(el => {
        const message = el.text();
        const catched = message === 'Gotcha!';
  
        if (catched) {
          cy.get('[data-testid="pokemon-details-has-owned-message"]').should(
            'not.exist'
          );
          cy.get('@first-card')
            .find('[data-testid="pokemon-card-owned"]')
            .should('exist');
        } else {
          cy.get('[data-testid="catch-button"]').should('exist');
        }

        cy.window().then(win => win.utils.localforage.clear())
      });
    })
  });
});
