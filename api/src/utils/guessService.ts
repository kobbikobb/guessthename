import * as nameTargetModel from '../models/nameTargetModel';
import * as guessesModel from '../models/guessesModel';
import { badRequest } from '../utils/errors';

export interface IGuessInput {
  userId: string;
  name: string;
  nameTargetId: string;
}

export const addGuess = async (guessInput: IGuessInput): Promise<any> => {
  const nameTarget = await nameTargetModel.findNameTarget(
    guessInput.nameTargetId
  );
  if (nameTarget === null) {
    throw badRequest('Name target does not exist.');
  }
  const createGuessInput: guessesModel.ICreateGuessInput = {
    userId: guessInput.userId,
    name: guessInput.name,
    nameTargetId: guessInput.nameTargetId,
    isCorrect: guessInput.name === nameTarget.name
  };
  return await guessesModel.createGuess(createGuessInput);
};
