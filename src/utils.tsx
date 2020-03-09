import localforage from 'localforage';
import { IMAGE_URL } from './config';

declare global {
  interface Window {
    utils: {
      calculateCatchPokemon: any;
      localforage: any;
    };
  }
}
export const generateImageUrlByUrl = (url: string): string => {
  const splittedUrl = url.split('/');
  const id =
    splittedUrl[splittedUrl.length - 1] || splittedUrl[splittedUrl.length - 2];
  return `${IMAGE_URL}/${id}.png`;
};
export const generateImageUrlById = (id: number): string => {
  return `${IMAGE_URL}/${id}.png`;
};

export const utils = {
  calculateCatchPokemon: () => Math.random() < 0.5,
  localforage,
};

export const convertDashedToReadable = (dashedString: string): string => {
  return dashedString.replace(/-/g, ' ');
};

(window as Window).utils = utils;
