import {
  connect,
  cleanData,
  disconnect
} from '../../__helper__/mongodb.memory.test.helper';
import { createGuess, getGuesses } from '../guessesModel';
import {
  createNameTarget,
  getNameTargets,
  findNameTarget
} from '../nameTargetModel';

const createANameTarget = () => {
  return createNameTarget({
    userId: 'some-user-id',
    title: 'some title',
    name: 'some name'
  });
};

describe('Guess Model', () => {
  beforeAll(connect);
  beforeEach(cleanData);
  afterAll(disconnect);

  it('should create a guess', async () => {
    const nameTarget = await createANameTarget();
    const guess = await createGuess({
      userId: 'the-user-id',
      nameTargetId: nameTarget.id,
      name: 'Correct Name',
      isCorrect: true
    });

    expect(guess).toEqual(
      expect.objectContaining({
        userId: 'the-user-id',
        nameTargetId: nameTarget.id,
        name: 'Correct Name',
        isCorrect: true,
        id: expect.anything()
      })
    );
  });

  it('should fetch an empty list of guesses', async () => {
    const nameTarget = await createANameTarget();
    const guesses = await getGuesses(nameTarget.id);
    expect(guesses).toHaveLength(0);
  });

  it('should fetch a list with a guess', async () => {
    const nameTarget = await createANameTarget();
    const guess = await createGuess({
      userId: 'the-user-id',
      nameTargetId: nameTarget.id,
      name: 'Correct Name',
      isCorrect: true
    });

    const guesses = await getGuesses(nameTarget.id);

    expect(guesses).toContainEqual(
      expect.objectContaining({
        userId: 'the-user-id',
        nameTargetId: nameTarget.id,
        name: 'Correct Name',
        isCorrect: true,
        id: guess.id
      })
    );
  });
});
