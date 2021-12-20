import {HttpStatus} from '../httpUtils';

describe('http utils', () => {

  it('should be ok', () => {
    expect(HttpStatus.OK).toBe(200);
  });

  it('should not found', () => {
    expect(HttpStatus.NOT_FOUND).toBe(404);
  })

});