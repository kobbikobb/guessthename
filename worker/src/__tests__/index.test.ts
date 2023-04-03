import { isRunning } from '..';

describe('index', () => {
  it('should be running', () => {
    expect(isRunning()).toEqual(true);
  });
});
