import { tryParseJson } from '../messageHelper';

describe('messageHelper', () => {
  it('should parse undefined json', () => {
    expect(tryParseJson(undefined)).toEqual(undefined);
  });

  it('should parse invalid json', () => {
    expect(tryParseJson('invalid')).toEqual(undefined);
  });

  it('should parse json', () => {
    const jsonStrong = '{"action":"value"}';
    expect(tryParseJson(jsonStrong)).toEqual({ action: 'value' });
  });
});
