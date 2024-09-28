import { HttpStatus } from '../utils/httpUtils';

export const badRequest = (message: string): HttpError => {
    return new HttpError(HttpStatus.BAD_REQUEST, message);
};

export class HttpError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
    }
}
