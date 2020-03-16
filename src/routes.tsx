import React from 'react';
import { generateAsyncComponent } from './components/AsyncComponent';
import { RouteConfig } from 'react-router-config';
import { PATHS } from './contexts/MainRouterContext';
import { Redirect } from 'react-router-dom';

//ROUTERS
const Pokemons = generateAsyncComponent(() =>
  import(/* webpackChunkName: "Pokemons" */ './screens/Pokemons')
);
const MyPokemons = generateAsyncComponent(() =>
  import(/* webpackChunkName: "MyPokemons" */ './screens/MyPokemons')
);

const PokemonDetails = generateAsyncComponent(() =>
  import(/*webpackChunkName: "PokemonDetails"*/ './screens/PokemonDetails')
);

const Routers: RouteConfig[] = [
  {
    component: Pokemons,
    path: PATHS.POKEMONS,
    routes: [
      {
        component: PokemonDetails,
        path: '/pokemons/:name',
      },
    ],
  },
  {
    component: MyPokemons,
    path: PATHS.MY_POKEMONS,
    routes: [
      {
        component: PokemonDetails,
        path: '/mypokemons/:name',
      },
    ],
  },
  {
    // eslint-disable-next-line react/display-name
    component: () => <Redirect from="/" to={PATHS.POKEMONS} />,
    path: '/',
  },
];

export default Routers;
