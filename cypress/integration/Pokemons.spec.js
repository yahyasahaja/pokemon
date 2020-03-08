describe('Pokemon list', () => {
  it('Open pokemons page and renders correct length', () => {
    cy.server();
    cy.route(
      'GET',
      'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20',
      'fixture:pokemons.json'
    );
    cy.visit('/pokemons');
    cy.get('[data-testid="pokemon-card"]').should('have.length', 20);
  });
});
