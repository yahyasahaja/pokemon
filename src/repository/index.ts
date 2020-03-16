import Axios from 'axios';

export const fetchPokemons = async (offset: number = 0, limit: number = 10) => {
  return await Axios.get(`/pokemon?offset=${offset}&limit=${limit}`);
};

export const fetchPokemon = async (name: string) => {
  return await Axios.get(`/pokemon/${name}`);
};
