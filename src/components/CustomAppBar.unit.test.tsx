import React from 'react';
import CustomAppBar from './CustomAppBar';
import { mount } from 'enzyme';
import {
  MainRouterContext,
  NavigationProps,
} from '../contexts/MainRouterContext';
import { BrowserRouter } from 'react-router-dom';

export const PATHS = {
  POKEMONS: '/pokemons',
  MY_POKEMONS: '/mypokemons',
};

export const ROUTER_STATE = {
  OPEN_CONTAINER: 'opencontainer',
  CLOSE_CONTAINER: 'closecontainer',
};

export const DEFAULT_ROUTERS: NavigationProps[] = [
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

describe('<CustomAppBar/>', () => {
  it('Should render empty div if the app does not need to show AppInstall', () => {
    const wrapper = mount(
      <MainRouterContext.Provider
        value={{
          selectedPath: PATHS.POKEMONS,
          selectedRoute: DEFAULT_ROUTERS[0],
          containerPose: ROUTER_STATE.OPEN_CONTAINER,
          routers: DEFAULT_ROUTERS,
        }}
      >
        <BrowserRouter>
          <CustomAppBar />
        </BrowserRouter>
      </MainRouterContext.Provider>
    );

    expect(wrapper.find('[data-testid="appbar-title"]').text()).toEqual(
      DEFAULT_ROUTERS[0].label
    );
    wrapper.unmount();
  });
});
