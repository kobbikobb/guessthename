import request from 'supertest';
import app from '../../app';
import { HttpStatus } from '../../utils/httpUtils';
import { connect, close, clear } from '../../tests/mongoTestServer';

describe('name target controller', () => {
  beforeAll(async () => {
    await connect();
  });
  afterEach(async () => {
    await clear();
  });
  afterAll(async () => {
    await close();
  });

  it('should add correct name-target', async () => {
    const response = await request(app).post('/name-target').send({
      userId: 'my-user-id',
      name: 'Sara'
    });

    expect(response.statusCode).toEqual(HttpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.anything(),
        userId: 'my-user-id',
        name: 'Sara'
      })
    );
  });

  it('should not add empty name target', async () => {
    const response = await request(app).post('/name-target').send({
      userId: 'my-user-id',
      name: ''
    });

    expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
  });

  it('should get empty name targets', async () => {
    const response = await request(app).get('/name-target');

    expect(response.statusCode).toEqual(HttpStatus.OK);
    expect(response.body).toEqual({ results: [] });
  });

  it('should get name targets containing a single name target', async () => {
    await request(app).post('/name-target').send({
      userId: 'my-user-id-1',
      name: 'Esja'
    });

    const response = await request(app).get('/name-target');

    expect(response.statusCode).toEqual(HttpStatus.OK);
    expect(response.body.results.length).toEqual(1);
    expect(response.body.results[0]).toEqual(
      expect.objectContaining({
        id: expect.anything(),
        userId: 'my-user-id-1',
        name: 'Esja'
      })
    );
  });

  it('should get several name targets', async () => {
    await request(app).post('/name-target').send({
      userId: 'my-user-id-1',
      name: 'Esja'
    });
    await request(app).post('/name-target').send({
      userId: 'my-user-id-2',
      name: 'Eva'
    });

    const response = await request(app).get('/name-target');

    expect(response.statusCode).toEqual(HttpStatus.OK);
    expect(response.body.results.length).toEqual(2);
  });
});
