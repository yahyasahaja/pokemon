import React, { Component } from 'react';
import localforage from 'localforage';
import { LOCAL_MY_POKEMONS_URI } from '../config';
import { calculateCatchPokemon } from '../utils';
import { PokemonListItem } from './PokemonContext';
import { withOverlayLoading } from './OverlayLoadingContext';
import { withSnackbar } from './SnackbarContext';

interface Actions {
  fetchMyPokemons?: () => Promise<PokemonListItem[]>;
  catchPokemon?: (pokemonListItem: PokemonListItem) => Promise<any>;
  clearCatchTimeout?: () => void;
  isOwned?: (name: string) => boolean;
  clearPokemons?: () => void;
}

interface DefaultValue extends Actions {
  myPokemons: PokemonListItem[];
  isCalculatingCatch: boolean;
  timeoutId: number;
}

export const defaultValue: DefaultValue = {
  myPokemons: [],
  isCalculatingCatch: false,
  timeoutId: -1,
};

export const MyPokemonContext = React.createContext(defaultValue);

class MyPokemonStoreClass extends Component<any, DefaultValue>
  implements Actions {
  state = defaultValue;

  catchPokemon = (pokemonListItem: PokemonListItem) => {
    return new Promise(resolve => {
      this.props.overlayLoadingContext.show();
      const timeoutId = setTimeout(async () => {
        this.props.overlayLoadingContext.hide();
        if (calculateCatchPokemon()) {
          const myPokemons: PokemonListItem[] = await this.getMyPokemonsFromLocal();

          if (myPokemons) {
            const isOwned = await this.isOwned(pokemonListItem.name);
            if (!isOwned) {
              myPokemons.push(pokemonListItem);
              this.props.snackbarContext.show('Gotcha', {
                severity: 'success',
              });
            }
            const newMyPokemons = [...myPokemons];
            await localforage.setItem(LOCAL_MY_POKEMONS_URI, newMyPokemons);
            await this.setStateAsync({
              myPokemons: newMyPokemons,
            });
            resolve(newMyPokemons);
          }
        } else {
          this.props.snackbarContext.show('Failed :(', {
            severity: 'warning',
          });
        }

        resolve(false);
      }, Math.random() * 2000 + 1000);

      this.setStateAsync({ timeoutId });
    });
  };

  clearCatchTimeout = async () => {
    const { timeoutId } = this.state;
    if (timeoutId !== -1) {
      clearTimeout(timeoutId);
      await this.setStateAsync({
        timeoutId: -1,
      });
    }
  };

  clearPokemons = async () => {
    const newMyPokemons = [];
    await this.setStateAsync({
      myPokemons: newMyPokemons,
    });
    await localforage.setItem(LOCAL_MY_POKEMONS_URI, newMyPokemons);
  };

  fetchMyPokemons = async () => {
    try {
      const myPokemons: PokemonListItem[] = await this.getMyPokemonsFromLocal();
      if (myPokemons) {
        await this.setStateAsync({
          myPokemons,
        });

        return myPokemons;
      }
      const newMyPokemons = [];
      await localforage.setItem(LOCAL_MY_POKEMONS_URI, newMyPokemons);
      await this.setStateAsync({
        myPokemons: { ...newMyPokemons },
      });
      return newMyPokemons;
    } catch (err) {
      console.log(err);
    } finally {
      await this.setStateAsync({ isFetchingMyPokemons: false });
    }

    return [];
  };

  getMyPokemonsFromLocal = async () => {
    const myPokemons: PokemonListItem[] = await localforage.getItem(
      LOCAL_MY_POKEMONS_URI
    );

    if (myPokemons) return myPokemons;

    const newMyPokemons = [];
    localforage.setItem(LOCAL_MY_POKEMONS_URI, newMyPokemons);
    return newMyPokemons;
  };

  isOwned = (name: string) => {
    const { myPokemons } = this.state;
    if (myPokemons.length > 0) {
      for (const pokemon of myPokemons) {
        if (pokemon.name === name) {
          return true;
        }
      }
    }

    return false;
  };

  setStateAsync = (state: any): Promise<DefaultValue> => {
    return new Promise(resolve => {
      this.setState(state, () => resolve(state));
    });
  };

  render() {
    return (
      <MyPokemonContext.Provider
        value={{
          ...this.state,
          fetchMyPokemons: this.fetchMyPokemons,
          catchPokemon: this.catchPokemon,
          clearCatchTimeout: this.clearCatchTimeout,
          isOwned: this.isOwned,
          clearPokemons: this.clearPokemons,
        }}
      >
        {this.props.children}
      </MyPokemonContext.Provider>
    );
  }
}

export const MyPokemonStore = withOverlayLoading(
  withSnackbar(MyPokemonStoreClass)
);

export const withMyPokemon = (Comp: any) => (props: any) => (
  <MyPokemonContext.Consumer>
    {myPokemonContext => (
      <Comp {...props} myPokemonContext={myPokemonContext} />
    )}
  </MyPokemonContext.Consumer>
);
