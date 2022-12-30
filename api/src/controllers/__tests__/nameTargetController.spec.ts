import request from 'supertest';
import {
  connect,
  cleanData,
  disconnect
} from '../../__helper__/mongodb.memory.test.helper';
import app from '../../app';
import { HttpStatus } from '../../utils/httpUtils';

describe('Name Target Controller', () => {
  beforeAll(connect);
  beforeEach(cleanData);
  afterAll(disconnect);

  it('should create a name target', async () => {
    const response = await request(app).post('/name-target').send({
      userId: 'the-user-id',
      title: 'A title',
      name: 'A name'
    });

    // TODO: Consider 201 for creating a name target
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        userId: 'the-user-id',
        title: 'A title',
        name: 'A name',
        id: expect.anything(),
        createdAt: expect.anything()
      })
    );
  });

  it('should not create a name target when userId is missing', async () => {
    const response = await request(app).post('/name-target').send({
      userId: '',
      title: 'A title',
      name: 'A name'
    });

    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('should not create a name target when title is missing', async () => {
    const response = await request(app).post('/name-target').send({
      userId: 'the-user-id',
      title: '',
      name: 'A name'
    });

    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('should not create a name target when name is missing', async () => {
    const response = await request(app).post('/name-target').send({
      userId: 'the-user-id',
      title: 'A title',
      name: ''
    });

    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('should fetch an empty list of name targets', async () => {
    const response = await request(app).get('/name-target');

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toEqual({ results: [] });
  });

  it('should fetch a list of one name target', async () => {
    const createdResponse = await request(app).post('/name-target').send({
      userId: 'the-user-id',
      title: 'A title',
      name: 'A secret name to guess'
    });
    const created = createdResponse.body;

    const response = await request(app).get('/name-target');

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toEqual({
      results: [
        {
          userId: 'the-user-id',
          title: 'A title',
          id: created.id,
          createdAt: created.createdAt
        }
      ]
    });
  });
});
