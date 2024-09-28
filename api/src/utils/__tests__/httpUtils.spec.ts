import { HttpStatus } from '../httpUtils';

describe('http utils', () => {
    it('should be ok', () => {
        expect(HttpStatus.OK).toEqual(200);
    });

    it('should not found', () => {
        expect(HttpStatus.NOT_FOUND).toEqual(404);
    });

    it('should be forbidden', () => {
        expect(HttpStatus.FORBIDDEN).toEqual(401);
    });
});
