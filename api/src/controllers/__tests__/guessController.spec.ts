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

  describe('with a name target', () => {
    const userId = 'my-user-id-1';
    const correctName = 'Amy Smith';
    let nameTargetId: '';

    beforeEach(async () => {
      const response = await request(app).post('/name-target').send({
        userId: userId,
        name: correctName
      });

      nameTargetId = response.body.id;
    });

    it('should add correct guess', async () => {
      const response = await request(app).post('/guess').send({
        userId,
        nameTargetId,
        name: correctName
      });

      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          userId,
          nameTargetId,
          name: correctName,
          isCorrect: true
        })
      );
    });

    it('should add incorrect guess', async () => {
      const response = await request(app).post('/guess').send({
        userId,
        nameTargetId,
        name: 'Incorrect name'
      });

      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.anything(),
          userId,
          nameTargetId,
          name: 'Incorrect name',
          isCorrect: false
        })
      );
    });

    it('should get empty guesses', async () => {
      const response = await request(app).get(
        `/guess?nameTargetId=${nameTargetId}`
      );
      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body).toEqual({ results: [] });
    });

    it('should get empty guesses when guesss exists for another target', async () => {
      await request(app).post('/guess').send({
        userId,
        nameTargetId,
        name: 'Jack The Yellow'
      });
      const anotherNameTargetId = (
        await request(app).post('/name-target').send({
          userId: userId,
          name: 'Another name target'
        })
      ).body.id;

      const response = await request(app).get(
        `/guess?nameTargetId=${anotherNameTargetId}`
      );

      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body).toEqual({ results: [] });
    });

    it('should get guesses containing a single guess', async () => {
      await request(app).post('/guess').send({
        userId,
        nameTargetId,
        name: 'Jack The Yellow'
      });

      const response = await request(app).get(
        `/guess?nameTargetId=${nameTargetId}`
      );

      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body.results.length).toEqual(1);
      expect(response.body.results[0]).toEqual(
        expect.objectContaining({
          id: expect.anything(),
          userId,
          nameTargetId,
          name: 'Jack The Yellow'
        })
      );
    });

    it('should get several guesses', async () => {
      await request(app).post('/guess').send({
        userId,
        nameTargetId,
        name: 'Jack The Yellow'
      });
      await request(app).post('/guess').send({
        userId,
        nameTargetId,
        name: 'Jack The Red'
      });

      const response = await request(app).get(
        `/guess?nameTargetId=${nameTargetId}`
      );

      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body.results.length).toEqual(2);
    });

    it('should not get guesses when using mongo injection', async () => {
      await request(app).post('/guess').send({
        userId,
        nameTargetId,
        name: 'Jack The Yellow'
      });
      await request(app).post('/guess').send({
        userId,
        nameTargetId,
        name: 'Jack The Red'
      });

      const response = await request(app).get(`/guess?nameTargetId={ $ne:1 }`);

      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body.results.length).toEqual(0);
    });
  });
});
