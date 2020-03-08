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
      cy.wait(3000)
      cy.go('back');
      cy.get('[data-testid="routers"]').eq(1).click({force: true});
      cy.get('[data-testid="pokemon-card"]').should('exist');
      cy.get('[data-testid="pokemon-card"]')
        .first()
        .find('[data-testid="pokemon-card-name"]')
        .then(el => {
          const name = el.text();
          expect(name).to.equal('bulbasaur')
        })
      cy.window().then(win => win.utils.localforage.clear())
    });
  });
});
