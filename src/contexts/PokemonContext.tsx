import React, { Component } from 'react';
import Axios from 'axios';
import { generateImageUrlById, generateImageUrlByUrl } from '../utils';
import localforage from 'localforage';
import { LOCAL_POKEMON_MAP_URI } from '../config';

export type Ability = {
  ability: {
    name: string;
  };
};

export type Stat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
  };
};

export type Type = {
  slot: number;
  type: {
    name: string;
  };
};

export type Pokemon = {
  name: string;
  species: {
    name: string;
  };
  image_url: string;
  abilities: Ability[];
  stats: Stat[];
  types: Type[];
};

export interface PokemonsMap {
  [name: string]: Pokemon;
}

export type PokemonListItem = {
  name: string;
  image_url: string;
};

interface Actions {
  fetchPokemons?: () => void;
  fetchPokemon?: (name: string) => void;
  next?: () => void;
  resetAndFetch?: () => void;
}

interface DefaultValue extends Actions {
  pokemons: PokemonListItem[];
  isFetchingPokemons: boolean;
  pokemon: Pokemon | null;
  isFetchingPokemon: boolean;
  offset: number;
  limit: number;
  hasNext: boolean;
}

export const defaultValue: DefaultValue = {
  pokemons: [],
  pokemon: null,
  isFetchingPokemon: false,
  isFetchingPokemons: false,
  offset: 0,
  limit: 20,
  hasNext: false,
};

export const PokemonContext = React.createContext(defaultValue);

export class PokemonStore extends Component<any, DefaultValue>
  implements Actions {
  state = defaultValue;

  fetchPokemon = async (name: string) => {
    try {
      await this.setStateAsync({ isFetchingPokemon: true });
      const pokemonFromLocal = await this.getPokemonFromLocal(name);

      if (pokemonFromLocal) {
        await this.setStateAsync({
          pokemon: pokemonFromLocal,
        });
      }

      const { data } = await Axios.get(`/pokemon/${name}`);

      if (data) {
        const pokemonResult: Pokemon = {
          name: data.name,
          image_url: generateImageUrlById(data.id),
          abilities: data.abilities,
          species: data.species,
          stats: data.stats,
          types: data.types,
        };

        this.setStateAsync({ pokemon: { ...pokemonResult } });
        this.setPokemonToLocal(pokemonResult);
      }
    } catch (err) {
      console.log(err);
    } finally {
      await this.setStateAsync({ isFetchingPokemon: false });
    }
  };

  getPokemonFromLocal = async (name: string) => {
    const pokemonsMap = await this.getPokemonsMapFromLocal();
    if (pokemonsMap) {
      return pokemonsMap[name];
    }
  };

  setPokemonToLocal = async (pokemon: Pokemon) => {
    const pokemonsMap: PokemonsMap = await this.getPokemonsMapFromLocal();
    pokemonsMap[pokemon.name] = pokemon;
    this.setPokemonsMapToLocal(pokemonsMap);
  };

  getPokemonsMapFromLocal = async () => {
    const pokemonsMap: PokemonsMap = await localforage.getItem(
      LOCAL_POKEMON_MAP_URI
    );
    if (pokemonsMap) return pokemonsMap;
    const newMap = {};
    await localforage.setItem(LOCAL_POKEMON_MAP_URI, newMap);
    return newMap;
  };

  setPokemonsMapToLocal = async (pokemonsMap: PokemonsMap) => {
    await localforage.setItem(LOCAL_POKEMON_MAP_URI, pokemonsMap);
  };

  fetchPokemons = async () => {
    try {
      await this.setStateAsync({ isFetchingPokemons: true });
      const { offset, limit } = this.state;

      const {
        data: { results, next },
      } = await Axios.get(`/pokemon?offset=${offset}&limit=${limit}`);

      if (results) {
        const pokemonsResult: PokemonListItem[] = results.map((d: any) => {
          const pokemon: PokemonListItem = {
            name: d.name,
            image_url: generateImageUrlByUrl(d.url),
          };
          return pokemon;
        });

        this.setStateAsync({
          pokemons: [...this.state.pokemons, ...pokemonsResult],
          hasNext: !!next,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      await this.setStateAsync({ isFetchingPokemons: false });
    }
  };

  next = async () => {
    const { offset, limit, hasNext } = this.state;

    if (hasNext) {
      await this.setStateAsync({ offset: offset + limit });
      await this.fetchPokemons();
    }
  };

  resetAndFetch = async () => {
    await this.setStateAsync({ offset: 0, pokemons: [] });
    await this.fetchPokemons();
  };

  setStateAsync = (state: any): Promise<DefaultValue> => {
    return new Promise(resolve => {
      this.setState(state, () => resolve(state));
    });
  };

  render() {
    return (
      <PokemonContext.Provider
        value={{
          ...this.state,
          fetchPokemon: this.fetchPokemon,
          fetchPokemons: this.fetchPokemons,
          next: this.next,
          resetAndFetch: this.resetAndFetch,
        }}
      >
        {this.props.children}
      </PokemonContext.Provider>
    );
  }
}

export const withPokemon = (Comp: any) => (props: any) => (
  <PokemonContext.Consumer>
    {pokemonContext => <Comp {...props} pokemonContext={pokemonContext} />}
  </PokemonContext.Consumer>
);
