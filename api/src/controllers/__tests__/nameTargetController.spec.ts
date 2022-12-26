import request from 'supertest';
import app from '../../app';
import { HttpStatus } from '../../utils/httpUtils';
import {
  connect,
  cleanData,
  cleanConnections
} from '../../__helper__/mongo.memory.server.test.helper';

describe('name target controller', () => {
  beforeAll(connect);
  beforeEach(cleanData);
  afterAll(cleanConnections);

  it('should add correct name-target', async () => {
    const response = await request(app).post('/name-target').send({
      userId: 'my-user-id',
      title: 'Mike and Amy',
      name: 'Sara'
    });

    expect(response.statusCode).toEqual(HttpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.anything(),
        userId: 'my-user-id',
        title: 'Mike and Amy',
        name: 'Sara',
        createdAt: expect.anything()
      })
    );
  });

  it('should not add name target when title is missing', async () => {
    const response = await request(app).post('/name-target').send({
      userId: 'my-user-id',
      title: '',
      name: 'Name'
    });

    expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
  });

  it('should not add name target when name is missing', async () => {
    const response = await request(app).post('/name-target').send({
      userId: 'my-user-id',
      title: 'Title',
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
      title: 'Stelpan þeirra Jakobs og Dagnýjar',
      name: 'Esja'
    });

    const response = await request(app).get('/name-target');

    expect(response.statusCode).toEqual(HttpStatus.OK);
    expect(response.body.results.length).toEqual(1);
    expect(response.body.results[0]).toEqual(
      expect.objectContaining({
        id: expect.anything(),
        userId: 'my-user-id-1',
        title: 'Stelpan þeirra Jakobs og Dagnýjar',
        createdAt: expect.anything()
      })
    );
  });

  it('should get several name targets', async () => {
    await request(app).post('/name-target').send({
      userId: 'my-user-id-1',
      title: 'Jakob og Dagný',
      name: 'Esja'
    });
    await request(app).post('/name-target').send({
      userId: 'my-user-id-2',
      title: 'Beggi og Hrefna',
      name: 'Eva'
    });

    const response = await request(app).get('/name-target');

    expect(response.statusCode).toEqual(HttpStatus.OK);
    expect(response.body.results.length).toEqual(2);
  });
});
