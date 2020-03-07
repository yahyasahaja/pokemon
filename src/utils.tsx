export const generateImageUrlByUrl = (url: string): string => {
  const splittedUrl = url.split('/');
  return `https://pokeres.bastionbot.org/images/pokemon/${
    splittedUrl[splittedUrl.length - 2]
  }.png`;
};
export const generateImageUrlById = (id: number): string => {
  return `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
};
export const calculateCatchPokemon = () => Math.random() < 0.5;
