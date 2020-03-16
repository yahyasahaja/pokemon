import React from 'react';
import styled from 'styled-components';

import { RouteComponentProps } from 'react-router-dom';
import { PokemonContext, PokemonListItem } from '../contexts/PokemonContext';
import WindowRoute from '../components/WindowRoute';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import MDIcon from '../components/MDIcon';
import PokemonDetailSkeleton from '../components/PokemonDetailSkeleton';
import { Button, TextField } from '@material-ui/core';
import {
  MyPokemonContext,
  MyPokemonListItem,
} from '../contexts/MyPokemonContext';
import { Chip } from '../components/Chip';

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
      flex-wrap: wrap;
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
      padding: 5px 0;

      .owned-label {
        font-size: 11pt;
        text-align: left;
        margin-bottom: 10px;
        font-weight: bold;
      }

      .nickname-mutation-wrapper {
        display: flex;
        align-items: center;

        .save-button {
          margin-left: 10px;
        }
      }
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
  const {
    pokemon,
    resetPokemon,
    fetchPokemon,
    isFetchingPokemon,
  } = React.useContext(PokemonContext);
  const { catchPokemon, isOwned, updateNickname, release } = React.useContext(
    MyPokemonContext
  );
  const [nickname, setNickname] = React.useState('');
  const nicknameInput = React.useRef<any>(null);
  const { match } = props;
  let ownedPokemon: MyPokemonListItem | null = null;

  React.useEffect(() => {
    if (fetchPokemon) fetchPokemon(match.params.name);

    return () => {
      if (resetPokemon) resetPokemon();
    };
    // eslint-disable-next-line
  }, [])

  if (isOwned && pokemon) {
    ownedPokemon = isOwned(pokemon.name);
  }

  React.useEffect(() => {
    if (ownedPokemon) setNickname(ownedPokemon.nickname);
    // eslint-disable-next-line
  }, [pokemon]);

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
        {ownedPokemon && (
          <div className="">
            Nickname:{' '}
            {ownedPokemon.nickname === ''
              ? "Haven't named"
              : ownedPokemon.nickname}
          </div>
        )}
        <div className="key-value">
          <div className="key">Species</div>
          <div className="value">{pokemon.species.name}</div>
        </div>
        <div className="key-value">
          <div className="key">Types</div>
          <div className="value">
            {pokemon.types.map((pokemonType, index: number) => {
              return <Chip key={index} value={pokemonType.type.name} />;
            })}
          </div>
        </div>

        <div className="key-value">
          <div className="key">Abilities</div>
          <div className="value">
            {pokemon.abilities.map((pokemonAbility, index: number) => {
              return <Chip key={index} value={pokemonAbility.ability.name} />;
            })}
          </div>
        </div>

        <div className="key-value">
          <div className="key">Moves</div>
          <div className="value">
            {pokemon.moves.map((pokemonMove, index: number) => {
              return <Chip key={index} value={pokemonMove.move.name} />;
            })}
          </div>
        </div>

        <div className="catch-wrapper">
          {ownedPokemon ? (
            <div
              data-testid="pokemon-details-has-owned-message"
              className="owned"
            >
              <div className="owned-label">You have owned this pokemon</div>
              <div className="nickname-mutation-wrapper">
                <TextField
                  inputRef={nicknameInput}
                  name="update-nickname"
                  variant="standard"
                  color="primary"
                  label="Nickname"
                  data-testid="input-nickname"
                  fullWidth
                  placeholder="Type this pokemon nickname"
                  value={nickname}
                  onChange={e => setNickname(e.target.value)}
                />

                <Button
                  className="save-button"
                  data-testid="save-nickname-button"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (updateNickname) updateNickname(pokemon.name, nickname);
                  }}
                >
                  Save
                </Button>
                <Button
                  className="save-button"
                  variant="contained"
                  data-testid="release-button"
                  color="secondary"
                  onClick={() => {
                    if (release) release(pokemon.name);
                  }}
                >
                  Release
                </Button>
              </div>
            </div>
          ) : (
            <Button
              fullWidth
              color="primary"
              variant="contained"
              data-testid="catch-button"
              onClick={async () => {
                if (catchPokemon) {
                  const res = await catchPokemon(pokemon as PokemonListItem);
                  if (res) {
                    setNickname('');
                    nicknameInput?.current?.focus();
                  }
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
