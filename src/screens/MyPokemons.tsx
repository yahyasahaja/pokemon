import React from 'react';
import styled from 'styled-components';

import { Route } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import BaseRoute from '../components/BaseRoute';
import asyncComponent from '../components/AsyncComponent';
import { MyPokemonContext } from '../contexts/MyPokemonContext';
import MDIcon from '../components/MDIcon';
import CustomAppBar from '../components/CustomAppBar';
import { IconButton } from '@material-ui/core';

const PokemonDetails = asyncComponent(() =>
  import(/*webpackChunkName: "PokemonDetails"*/ './PokemonDetails')
);

const Container = styled.div`
  padding: 15px;
  padding-top: 25px;
  padding-bottom: 70px;

  .card-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background: white;
  }

  .empty {
    font-size: 20pt;
    font-weight: 300;
    text-align: center;
    color: #b5b5b5;
    margin-top: 50px;

    .icon {
      font-size: 79pt;
      opacity: 0.3;
      display: block;
      margin: auto;
      margin-top: 20px;
    }
  }
`;

const MyPokemons = () => {
  const { myPokemons, clearPokemons } = React.useContext(MyPokemonContext);

  function renderPokemons() {
    if (myPokemons.length === 0)
      return (
        <div data-testid="my-pokemons-empty" className="empty">
          <div>Empty</div>
          <MDIcon className="icon" icon="pokeball" />
        </div>
      );

    return (
      <div className="card-wrapper">
        {myPokemons.map((d, i) => (
          <PokemonCard key={i} data={d} />
        ))}
      </div>
    );
  }

  return (
    <BaseRoute>
      <CustomAppBar
        component={
          <IconButton
            data-testid="clear-my-pokemons"
            onClick={() => {
              if (clearPokemons) clearPokemons();
            }}
          >
            <MDIcon icon="eraser-variant" />
          </IconButton>
        }
      />
      <Container>
        {renderPokemons()}
        <Route path="/mypokemons/:name" component={PokemonDetails} />
      </Container>
    </BaseRoute>
  );
};

export default MyPokemons;
