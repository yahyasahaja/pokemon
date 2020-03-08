import React from 'react';
import styled from 'styled-components';

import { RouteComponentProps } from 'react-router-dom';
import { PokemonContext, PokemonListItem } from '../contexts/PokemonContext';
import WindowRoute from '../components/WindowRoute';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import MDIcon from '../components/MDIcon';
import PokemonDetailSkeleton from '../components/PokemonDetailSkeleton';
import { Button } from '@material-ui/core';
import { MyPokemonContext } from '../contexts/MyPokemonContext';

const Container = styled.div`
  padding: 15px;
  padding-top: 25px;
  padding-bottom: 90px;
  min-height: 100vh;

  .picture {
    width: 100%;
    height: 300px;
    padding: 10px;

    span {
      height: 100%;
      width: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }
  }

  .name {
    font-weight: bold;
    font-size: 15pt;
    text-transform: capitalize;
    margin-top: 20px;
  }

  .key-value {
    display: block;
    margin: 20px 0;

    .key {
      font-weight: bold;
    }

    .value {
      display: flex;
      margin-top: 10px;

      .pokemon-chip {
        margin-right: 20px;

        .chip {
          background: #3498db;
          color: white;
          border-radius: 100px;
          padding: 10px 20px;
        }
      }
    }
  }

  .catch-wrapper {
    width: 100%;
    padding: 10px;
    background: white;
    border-top: 1px solid #d0d0d0;
    position: fixed;
    bottom: 0;
    left: 0;

    .catch-icon {
      margin-right: 10px;
    }

    .owned {
      text-align: center;
      font-size: 15pt;
      padding: 10px 0;
      font-weight: 500;
      color: #0098e1;
    }
  }

  .not-found {
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

type ParamsType = {
  name: string;
};

const Pokemons = (props: RouteComponentProps<ParamsType>) => {
  const { pokemon, fetchPokemon, isFetchingPokemon } = React.useContext(
    PokemonContext
  );
  const { catchPokemon, isOwned } = React.useContext(MyPokemonContext);
  const { match } = props;

  React.useEffect(() => {
    if (fetchPokemon) fetchPokemon(match.params.name);
    // eslint-disable-next-line
  }, [])

  function renderPokemon() {
    if (isFetchingPokemon) return <PokemonDetailSkeleton />;

    if (!pokemon) {
      return (
        <div className="not-found">
          <div>Not Found</div>
          <MDIcon className="icon" icon="pokeball" />
        </div>
      );
    }

    return (
      <div>
        <div className="picture">
          <LazyLoadImage
            alt="profile picture"
            placeholderSrc="/images/placeholder.png"
            src={pokemon.image_url}
            effect="blur"
          />
        </div>

        <div className="name">{pokemon.name}</div>
        <div className="key-value">
          <div className="key">Species</div>
          <div className="value">{pokemon.species.name}</div>
        </div>
        <div className="key-value">
          <div className="key">Types</div>
          <div className="value">
            {pokemon.types.map((pokemonType, index: number) => {
              return (
                <div key={index} className="pokemon-chip">
                  <div className="chip" color="primary">
                    {pokemonType.type.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="key-value">
          <div className="key">Abilities</div>
          <div className="value">
            {pokemon.abilities.map((pokemonAbility, index: number) => {
              return (
                <div key={index} className="pokemon-chip">
                  <div className="chip" color="primary">
                    {pokemonAbility.ability.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="catch-wrapper">
          {isOwned && isOwned(pokemon.name) ? (
            <div
              data-testid="pokemon-details-has-owned-message"
              className="owned"
            >
              You have owned this pokemon
            </div>
          ) : (
            <Button
              fullWidth
              color="primary"
              variant="contained"
              data-testid="catch-button"
              onClick={() => {
                if (catchPokemon) {
                  catchPokemon(pokemon as PokemonListItem);
                }
              }}
            >
              <MDIcon className="catch-icon" icon="pokeball" />
              Catch!
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <WindowRoute title={pokemon ? pokemon.name : 'Pokemon Detail'}>
      <Container>{renderPokemon()}</Container>
    </WindowRoute>
  );
};

export default Pokemons;
