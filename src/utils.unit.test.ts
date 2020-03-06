import { generateAvatarName } from './utils';

describe('Test helper functions', () => {
  it('Should return 2 first character words of given name props', () => {
    expect(generateAvatarName('Asti Annisa')).toEqual('AA');
  });

  it('Should show first character for given one word name props', () => {
    expect(generateAvatarName('Asti')).toEqual('A');
  });

  it('Display result value with Upper Case', () => {
    expect(generateAvatarName('Yahya sahaja Asti')).toEqual('YS');
  });
});
