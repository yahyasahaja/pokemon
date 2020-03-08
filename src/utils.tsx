import localforage from 'localforage';

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
  return `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
};
export const generateImageUrlById = (id: number): string => {
  return `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
};

export const utils = {
  calculateCatchPokemon: () => Math.random() < 0.5,
  localforage,
};

export const convertDashedToReadable = (dashedString: string): string => {
  return dashedString.split('-').join(' ');
};

(window as Window).utils = utils;
