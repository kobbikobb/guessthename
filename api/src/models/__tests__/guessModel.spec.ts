import { createGuess, getGuesses } from '../guessesModel';
import { createNameTarget } from '../nameTargetModel';
import {
  connect,
  cleanData,
  cleanConnections
} from '../../__helper__/mongo.memory.server.test.helper';

const aNameTarget = (
  userId: string = 'user-123',
  title: string = 'A title',
  name: string = 'A name'
) => {
  return {
    userId,
    title,
    name
  };
};

describe('Guess Model', () => {
  beforeAll(connect);
  beforeEach(cleanData);
  afterAll(cleanConnections);

  it('should fetch an empty list of guesses', async () => {
    const nameTarget = await createNameTarget(aNameTarget());
    const guesses = await getGuesses(nameTarget.id);
    expect(guesses).toHaveLength(0);
  });

  it('should fetch a list with one guess', async () => {
    const nameTarget = await createNameTarget(aNameTarget());
    const guess = await createGuess({
      userId: 'abc-134',
      nameTargetId: nameTarget.id,
      name: 'Incorrect',
      isCorrect: false
    });
    const guesses = await getGuesses(nameTarget.id);

    expect(guesses).toHaveLength(1);
    expect(guesses).toContainEqual(
      expect.objectContaining({
        userId: 'abc-134',
        nameTargetId: nameTarget.id,
        name: 'Incorrect',
        isCorrect: false,
        id: guess.id,
        createdAt: expect.anything()
      })
    );
  });
  
});
