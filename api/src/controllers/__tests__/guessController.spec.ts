import request from 'supertest';
import {
  connect,
  cleanData,
  disconnect
} from '../../__helper__/mongodb.memory.test.helper';
import app from '../../app';
import { HttpStatus } from '../../utils/httpUtils';

describe('Guess Controller', () => {
  beforeAll(connect);
  beforeEach(cleanData);
  afterAll(disconnect);

  describe('when name target exists', () => {
    const correctName = 'The correct name';
    const incorrectName = 'The incorrect name';
    let nameTargetId: string;

    beforeEach(async () => {
      const createdResponse = await request(app).post('/name-target').send({
        userId: 'the-user-id',
        title: 'A title',
        name: correctName
      });
      nameTargetId = createdResponse.body.id;
    });

    it('should create an incorrect guess', async () => {
      const response = await request(app)
        .post(`/guess?nameTargetId=${nameTargetId}`)
        .send({
          userId: 'the-user-id',
          nameTargetId,
          name: incorrectName
        });

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual({
        userId: 'the-user-id',
        nameTargetId,
        name: incorrectName,
        id: response.body.id,
        isCorrect: false
      });
    });

    it('should create a correct guess', async () => {
      const response = await request(app)
        .post(`/guess?nameTargetId=${nameTargetId}`)
        .send({
          userId: 'the-user-id',
          nameTargetId,
          name: correctName
        });

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual({
        userId: 'the-user-id',
        nameTargetId,
        name: correctName,
        id: response.body.id,
        isCorrect: true
      });
    });

    it('should not create a guess when userId is missing', async () => {
      const response = await request(app)
        .post(`/guess?nameTargetId=${nameTargetId}`)
        .send({
          userId: '',
          nameTargetId,
          name: incorrectName
        });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should not create a guess when name is missing', async () => {
      const response = await request(app)
        .post(`/guess?nameTargetId=${nameTargetId}`)
        .send({
          userId: 'the-user-id',
          nameTargetId,
          name: ''
        });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should fetch an empty list of guesses when name target does exist', async () => {
      const response = await request(app).get(
        `/guess?nameTargetId=${nameTargetId}`
      );

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual({ results: [] });
    });

    it('should fetch a list of one guess', async () => {
      const createdResponse = await request(app)
        .post(`/guess?nameTargetId=${nameTargetId}`)
        .send({
          userId: 'the-user-id',
          nameTargetId,
          name: correctName
        });

      const response = await request(app).get(
        `/guess?nameTargetId=${nameTargetId}`
      );

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual({
        results: [
          {
            userId: 'the-user-id',
            nameTargetId,
            name: correctName,
            id: createdResponse.body.id
          }
        ]
      });
    });

    it('should not fetch guesses by using nosql injection', async () => {
      await request(app).post(`/guess?nameTargetId=${nameTargetId}`).send({
        userId: 'the-user-id',
        nameTargetId,
        name: correctName
      });

      const response = await request(app).get('/guess?nameTargetId={$ne:1}');

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body.results).toHaveLength(0);
    });
  });

  describe('when name target does not exist', () => {
    it('should not create a guess when name target does not exist', async () => {
      const nameTargetId = 'something-that-does-not-exist';

      const response = await request(app)
        .post(`/guess?nameTargetId=${nameTargetId}`)
        .send({
          userId: 'the-user-id',
          nameTargetId,
          name: 'The guess'
        });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should not create a guess when name target is missing', async () => {
      const response = await request(app).post('/guess?nameTargetId=').send({
        userId: 'the-user-id',
        nameTargetId: '',
        name: ''
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should not be able to fetch guesses without a name target id', async () => {
      const response = await request(app).get('/guess');
      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('should fetch an empty list of guesses when name target does not exist', async () => {
      const nameTargetId = 'something-that-does-not-exist';

      const response = await request(app).get(
        `/guess?nameTargetId=${nameTargetId}`
      );

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body).toEqual({ results: [] });
    });
  });
});
