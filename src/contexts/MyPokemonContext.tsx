import React, { Component } from 'react';
import localforage from 'localforage';
import { LOCAL_MY_POKEMONS_URI } from '../config';
import { utils } from '../utils';
import { PokemonListItem } from './PokemonContext';
import { withOverlayLoading } from './OverlayLoadingContext';
import { withSnackbar } from './SnackbarContext';

export interface MyPokemonListItem extends PokemonListItem {
  nickname: string;
}

interface Actions {
  fetchMyPokemons?: () => Promise<MyPokemonListItem[]>;
  catchPokemon?: (pokemonListItem: PokemonListItem) => Promise<any>;
  clearCatchTimeout?: () => void;
  isOwned?: (name: string) => MyPokemonListItem | null;
  clearPokemons?: () => void;
  release?: (name: string) => void;
  updateNickname?: (name: string, nickname: string) => void;
}

interface DefaultValue extends Actions {
  myPokemons: MyPokemonListItem[];
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
  constructor(props) {
    super(props);
    this.state = props.value || defaultValue;
  }

  catchPokemon = (pokemonListItem: PokemonListItem) => {
    return new Promise(resolve => {
      this.props.overlayLoadingContext.show();
      const timeoutId = setTimeout(async () => {
        this.props.overlayLoadingContext.hide();
        if (utils.calculateCatchPokemon()) {
          const myPokemons: MyPokemonListItem[] = await this.getMyPokemonsFromLocal();

          if (myPokemons) {
            const isOwned = await this.isOwned(pokemonListItem.name);
            if (!isOwned) {
              myPokemons.push({
                ...pokemonListItem,
                nickname: '',
              });
              this.props.snackbarContext.show('Gotcha!', {
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
          this.props.snackbarContext.show('Failed to catch :( never give up!', {
            severity: null,
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
      const myPokemons: MyPokemonListItem[] = await this.getMyPokemonsFromLocal();
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
    const myPokemons: MyPokemonListItem[] = await localforage.getItem(
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
          return pokemon;
        }
      }
    }
    return null;
  };

  updateNickname = async (name: string, nickname: string) => {
    const myPokemons = await this.getMyPokemonsFromLocal();
    if (myPokemons.length > 0) {
      for (let i = 0; i < myPokemons.length; i++) {
        if (myPokemons[i].name === name) {
          myPokemons[i].nickname = nickname;
          await this.setStateAsync({
            myPokemons,
          });
          await localforage.setItem(LOCAL_MY_POKEMONS_URI, myPokemons);
          this.props.snackbarContext.show('Nickname updated', {
            severity: 'success',
          });
        }
      }
    }
  };

  release = async (name: string) => {
    const myPokemons = await this.getMyPokemonsFromLocal();
    if (myPokemons.length > 0) {
      for (let i = 0; i < myPokemons.length; i++) {
        if (myPokemons[i].name === name) {
          myPokemons.splice(i, 1);
          await this.setStateAsync({
            myPokemons,
          });
          await localforage.setItem(LOCAL_MY_POKEMONS_URI, myPokemons);
          this.props.snackbarContext.show(`Pokemon ${name} released`, {
            severity: 'success',
          });
        }
      }
    }
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
          updateNickname: this.updateNickname,
          release: this.release,
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
