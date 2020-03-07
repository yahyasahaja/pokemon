import React, { Component } from 'react';

export type NavigationProps = {
  icon: string;
  label: string;
  path: string;
  outline: boolean;
};

export const PATHS = {
  HOME: '/pokemons',
  MY_POKEMON: '/mypokemon',
};

export const ROUTER_STATE = {
  OPEN_CONTAINER: 'opencontainer',
  CLOSE_CONTAINER: 'closecontainer',
};

type DefaultValue = {
  selectedPath: string;
  selectedRoute: NavigationProps | null;
  containerPose: string;
  routers: NavigationProps[];
  checkAndUpdateRouter?: () => void;
  updateRouter?: (path: string) => void;
};

const DEFAULT_ROUTERS: NavigationProps[] = [
  {
    icon: 'pokemon-go',
    label: 'Pokemon List',
    path: '/pokemons',
    outline: false,
  },
  {
    icon: 'pokeball',
    label: 'My Pokemon',
    path: '/mypokemons',
    outline: false,
  },
];

export const defaultValue: DefaultValue = {
  selectedPath: PATHS.HOME,
  selectedRoute: null,
  containerPose: ROUTER_STATE.OPEN_CONTAINER,
  routers: DEFAULT_ROUTERS,
};

export const MainRouterContext = React.createContext(defaultValue);

export class MainRouterStore extends Component<any, DefaultValue> {
  state = defaultValue;

  updateRouter = (path: string) => {
    const route: NavigationProps | undefined = this.state.routers.find(
      v => v.path === path
    );

    if (route) {
      this.setState({
        selectedRoute: { ...route },
        selectedPath: route.path,
      });
    }
  };

  checkAndUpdateRouter = () => {
    const path: string = window.location.pathname;
    const routers = this.state.routers;

    if (routers) {
      const route: NavigationProps | undefined = routers.find(
        v => path.indexOf(v.path) !== -1
      );

      if (route) {
        this.setState({
          selectedRoute: route,
          selectedPath: route.path,
        });
      }
    }
  };

  render() {
    return (
      <MainRouterContext.Provider
        value={{
          ...this.state,
          checkAndUpdateRouter: this.checkAndUpdateRouter,
          updateRouter: this.updateRouter,
        }}
      >
        {this.props.children}
      </MainRouterContext.Provider>
    );
  }
}

export const withMainRouter = (Comp: any) => (props: any) => (
  <MainRouterContext.Consumer>
    {snackbarContext => <Comp {...props} snackbarContext={snackbarContext} />}
  </MainRouterContext.Consumer>
);
