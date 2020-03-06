import React, { Component } from 'react';

export type NavigationProps = {
  icon: string;
  label: string;
  path: string;
  outline: boolean;
};

export const PATHS = {
  HOME: '/home',
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
  updateRouters?: (routers: NavigationProps[]) => void;
  updateRouter?: (path: string) => void;
};

const DEFAULT_ROUTERS: NavigationProps[] = [
  {
    icon: 'home',
    label: 'Home',
    path: '',
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

  updateRouters(routers: NavigationProps[]) {
    const path: string = window.location.pathname;

    if (routers) {
      const route: NavigationProps | undefined = routers.find(
        v => v.path === path
      );

      if (route) {
        this.setState({
          selectedRoute: route,
        });
      }
    }
  }

  render() {
    return (
      <MainRouterContext.Provider
        value={{
          ...this.state,
          updateRouters: this.updateRouters,
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
