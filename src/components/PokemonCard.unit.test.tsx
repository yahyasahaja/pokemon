import React from 'react';
import PokemonCard from './PokemonCard';
import { mount } from 'enzyme';
import {
  MyPokemonContext,
  MyPokemonStore,
  defaultValue,
} from '../contexts/MyPokemonContext';
import { BrowserRouter } from 'react-router-dom';

describe('<CustomAppBar/>', () => {
  it('Should render given name', () => {
    const data = {
      name: 'shyduck',
      image_url: '/logo-512.png',
    };
    const wrapper = mount(
      <MyPokemonContext.Provider value={defaultValue}>
        <BrowserRouter>
          <PokemonCard data={data} />
        </BrowserRouter>
      </MyPokemonContext.Provider>
    );

    expect(wrapper.find('[data-testid="pokemon-card-name"]').text()).toEqual(
      data.name
    );
    wrapper.unmount();
  });

  it('Should render correct view if owned', () => {
    const data = {
      name: 'shyduck',
      image_url: '/logo-512.png',
    };
    const wrapper = mount(
      <MyPokemonStore
        value={{
          ...defaultValue,
          myPokemons: [data],
        }}
      >
        <BrowserRouter>
          <PokemonCard data={data} />
        </BrowserRouter>
      </MyPokemonStore>
    );

    expect(
      wrapper.find('div[data-testid="pokemon-card-owned"]').exists()
    ).toEqual(true);
    wrapper.unmount();
  });

  it('Should render correct view if not owned', () => {
    const data = {
      name: 'shyduck',
      image_url: '/logo-512.png',
    };
    const wrapper = mount(
      <MyPokemonStore
        value={{
          ...defaultValue,
          myPokemons: [
            {
              ...data,
              name: 'somethingelse',
            },
          ],
        }}
      >
        <BrowserRouter>
          <PokemonCard data={data} />
        </BrowserRouter>
      </MyPokemonStore>
    );

    expect(
      wrapper.find('div[data-testid="pokemon-card-owned"]').exists()
    ).toEqual(false);
    wrapper.unmount();
  });
});
