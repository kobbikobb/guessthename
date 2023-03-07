import { addGuess } from '../guessService';
import * as nameTargetModel from '../../models/nameTargetModel';
import * as guessesModel from '../../models/guessesModel';

jest.mock('../../models/nameTargetModel');
jest.mock('../../models/guessesModel');

describe('GuessService', () => {
  const findNameTarget = nameTargetModel.findNameTarget as jest.Mock;
  const createGuess = guessesModel.createGuess as jest.Mock;

  beforeAll(() => {
    findNameTarget.mockReset();
    createGuess.mockReset();
  });

  it('should guess the correct name', async () => {
    findNameTarget.mockReturnValue({
      name: 'Jack'
    });
    createGuess.mockReturnValue({
      createdAt: '2008-01-01'
    });

    const result = await addGuess({
      userId: 'theUserId',
      name: 'Jack',
      nameTargetId: 'theNameTargetId'
    });

    expect(createGuess).toBeCalledWith({
      userId: 'theUserId',
      name: 'Jack',
      nameTargetId: 'theNameTargetId',
      isCorrect: true
    });
    expect(result).toEqual({
      createdAt: '2008-01-01'
    });
  });

  it('should guess the incorrect name', async () => {
    findNameTarget.mockReturnValue({
      name: 'Incorrect'
    });
    createGuess.mockReturnValue({
      createdAt: '2008-01-01'
    });

    const result = await addGuess({
      userId: 'theUserId',
      name: 'Jack',
      nameTargetId: 'theNameTargetId'
    });

    expect(createGuess).toBeCalledWith({
      userId: 'theUserId',
      name: 'Jack',
      nameTargetId: 'theNameTargetId',
      isCorrect: false
    });
    expect(result).toEqual({
      createdAt: '2008-01-01'
    });
  });

  it('should fail if name target does not exist', async () => {
    findNameTarget.mockReturnValue(null);

    await expect(
      addGuess({
        userId: 'theUserId',
        name: 'Jack',
        nameTargetId: 'theNameTargetId'
      })
    ).rejects.toThrow('Name target does not exist.');
  });
});
