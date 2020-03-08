import React from 'react';
import BottomNavigation from './BottomNavigation';
import { mount } from 'enzyme';
import {
  MainRouterContext,
  NavigationProps,
} from '../contexts/MainRouterContext';
import { BrowserRouter } from 'react-router-dom';

const PATHS = {
  POKEMONS: '/pokemons',
  MY_POKEMONS: '/mypokemon',
};

const ROUTER_STATE = {
  OPEN_CONTAINER: 'opencontainer',
  CLOSE_CONTAINER: 'closecontainer',
};

const DEFAULT_ROUTERS: NavigationProps[] = [
  {
    icon: 'pokemon-go',
    label: 'Pokemon List',
    path: PATHS.POKEMONS,
    outline: false,
  },
  {
    icon: 'pokeball',
    label: 'My Pokemon',
    path: PATHS.MY_POKEMONS,
    outline: false,
  },
];

describe('<BottomNavigation/>', () => {
  it('Should render the given routers', () => {
    const wrapper = mount(
      <MainRouterContext.Provider
        value={{
          selectedPath: PATHS.POKEMONS,
          selectedRoute: null,
          containerPose: ROUTER_STATE.OPEN_CONTAINER,
          routers: DEFAULT_ROUTERS,
        }}
      >
        <BrowserRouter>
          <BottomNavigation />
        </BrowserRouter>
      </MainRouterContext.Provider>
    );

    expect(wrapper.find('button[data-testid="routers"]').length).toEqual(
      DEFAULT_ROUTERS.length
    );
    wrapper.unmount();
  });

  it('Should render the given 4 routers', () => {
    const wrapper = mount(
      <MainRouterContext.Provider
        value={{
          selectedPath: PATHS.POKEMONS,
          selectedRoute: null,
          containerPose: ROUTER_STATE.OPEN_CONTAINER,
          routers: [
            {
              icon: 'pokemon-go',
              label: 'Pokemon List',
              path: PATHS.POKEMONS,
              outline: false,
            },
            {
              icon: 'pokeball',
              label: 'My Pokemon',
              path: PATHS.MY_POKEMONS,
              outline: false,
            },
            {
              icon: 'pokemon-go',
              label: 'Pokemon List',
              path: PATHS.POKEMONS,
              outline: false,
            },
            {
              icon: 'pokeball',
              label: 'My Pokemon',
              path: PATHS.MY_POKEMONS,
              outline: false,
            },
          ],
        }}
      >
        <BrowserRouter>
          <BottomNavigation />
        </BrowserRouter>
      </MainRouterContext.Provider>
    );

    expect(wrapper.find('button[data-testid="routers"]').length).toEqual(4);
    wrapper.unmount();
  });

  it('Should show correct selected route', () => {
    const wrapper = mount(
      <MainRouterContext.Provider
        value={{
          selectedPath: PATHS.POKEMONS,
          selectedRoute: null,
          containerPose: ROUTER_STATE.OPEN_CONTAINER,
          routers: DEFAULT_ROUTERS,
        }}
      >
        <BrowserRouter>
          <BottomNavigation />
        </BrowserRouter>
      </MainRouterContext.Provider>
    );

    expect(
      wrapper
        .find('button[data-testid="routers"]')
        .first()
        .hasClass('Mui-selected')
    ).toEqual(true);
    wrapper.unmount();
  });

  it('Should show correct unselected route', () => {
    const wrapper = mount(
      <MainRouterContext.Provider
        value={{
          selectedPath: PATHS.MY_POKEMONS,
          selectedRoute: null,
          containerPose: ROUTER_STATE.OPEN_CONTAINER,
          routers: DEFAULT_ROUTERS,
        }}
      >
        <BrowserRouter>
          <BottomNavigation />
        </BrowserRouter>
      </MainRouterContext.Provider>
    );

    expect(
      wrapper
        .find('button[data-testid="routers"]')
        .first()
        .hasClass('Mui-selected')
    ).toEqual(false);
    wrapper.unmount();
  });
});
