import { createGuess, getGuesses } from '../guessesModel';
import { createNameTarget, INameTargetModel } from '../nameTargetModel';

const createANameTarget = async (): Promise<INameTargetModel> => {
  return await createNameTarget({
    userId: 'some-user-id',
    title: 'some title',
    name: 'some name'
  });
};

describe('Guess Model', () => {
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
