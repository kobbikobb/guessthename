import request from 'supertest';
import app from '../../app';
import { HttpStatus } from '../../utils/httpUtils';

describe('Name Target Controller', () => {
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

  it('should fetch a list of one name target', async () => {
    const createdResponse = await request(app).post('/name-target').send({
      userId: 'the-user-id',
      title: 'A title',
      name: 'A secret name to guess'
    });
    const { id, createdAt } = createdResponse.body;

    const response = await request(app).get('/name-target');

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toEqual({
      results: expect.arrayContaining([
        expect.objectContaining({
          userId: 'the-user-id',
          title: 'A title',
          id,
          createdAt
        })
      ])
    });
  });
});
