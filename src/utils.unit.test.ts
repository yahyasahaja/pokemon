import { generateImageUrlById, generateImageUrlByUrl } from './utils';

describe('Test helper functions', () => {
  it('generateImageUrlById shpuld give correct return value', () => {
    const id = 10;
    expect(generateImageUrlById(id)).toEqual(
      `https://pokeres.bastionbot.org/images/pokemon/${id}.png`
    );
  });

  it('generateImageUrlByUrl should give the correct return value', () => {
    const url = 'https://someurl/blabla/yay/2/';
    const result = generateImageUrlByUrl(url);
    expect(result).toContain('/2.png');
  });

  it('generateImageUrlByUrl correct return value with another url signature', () => {
    const url = 'https://someurl/blabla/yay/2';
    const result = generateImageUrlByUrl(url);
    expect(result).toContain('/2.png');
  });
});
