import request from 'supertest';
import app from '../../app';
import { HttpStatus } from '../../utils/httpUtils';

describe('guess controller', () => {
  it('should get empty guesses', async () => {
    const response = await request(app).get('/api/guess');

    expect(response.statusCode).toEqual(HttpStatus.OK);
    expect(response.body).toEqual({ results: [] });
  });

  it('should add guess', async () => {
    const response = await request(app).post('/api/guess').send({
      userId: 'my-user-id',
      name: 'Jack The Reaper'
    });

    expect(response.statusCode).toEqual(HttpStatus.OK);
    expect(response.body).toEqual({
      userId: 'my-user-id',
      name: 'Jack The Reaper'
    });
  });
});
