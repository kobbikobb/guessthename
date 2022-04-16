import request from 'supertest';
import app from '../../app';
import { HttpStatus } from '../../utils/httpUtils';
import { connect, close, clear } from '../../tests/mongoTestServer';

describe('guess controller', () => {
  beforeAll(async () => {
    await connect();
  });
  afterEach(async () => {
    await clear();
  });
  afterAll(async () => {
    await close();
  });

  it('should get empty guesses', async () => {
    const response = await request(app).get('/guess');

    expect(response.statusCode).toEqual(HttpStatus.OK);
    expect(response.body).toEqual({ results: [] });
  });

  it('should get guesses containing a single guess', async () => {
    await request(app).post('/guess').send({
      userId: 'my-user-id-1',
      name: 'Jack The Yellow'
    });

    const response = await request(app).get('/guess');

    expect(response.statusCode).toEqual(HttpStatus.OK);
    expect(response.body.results.length).toEqual(1);
    expect(response.body.results[0]).toEqual(
      expect.objectContaining({
        userId: 'my-user-id-1',
        name: 'Jack The Yellow'
      })
    );
  });

  it('should get several guesses', async () => {
    await request(app).post('/guess').send({
      userId: 'my-user-id-1',
      name: 'Jack The Yellow'
    });
    await request(app).post('/guess').send({
      userId: 'my-user-id-2',
      name: 'Jack The Red'
    });

    const response = await request(app).get('/guess');

    expect(response.statusCode).toEqual(HttpStatus.OK);
    expect(response.body.results.length).toEqual(2);
  });

  it('should add incorrect guess', async () => {
    const response = await request(app).post('/guess').send({
      userId: 'my-user-id',
      name: 'Jack The Reaper'
    });

    expect(response.statusCode).toEqual(HttpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        userId: 'my-user-id',
        name: 'Jack The Reaper',
        isCorrect: false
      })
    );
  });

  it('should add correct guess', async () => {
    const response = await request(app).post('/guess').send({
      userId: 'my-user-id',
      name: 'HardCodedForNow'
    });

    expect(response.statusCode).toEqual(HttpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        userId: 'my-user-id',
        name: 'HardCodedForNow',
        isCorrect: true
      })
    );
  });

  it('should add empty guess', async () => {
    const response = await request(app).post('/guess').send({
      userId: 'my-user-id',
      name: ''
    });

    expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
  });
});
