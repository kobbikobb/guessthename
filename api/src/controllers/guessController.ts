import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../utils/httpUtils';
import * as nameTargetModel from '../models/nameTargetModel';
import * as guessesModel from '../models/guessesModel';

export interface IGuessInput {
  userId: string;
  name: string;
  nameTargetId: string;
}

const parseGuessFromBody = (body: any): IGuessInput => {
  const guessInput = {
    userId: body.userId as string,
    nameTargetId: body.nameTargetId as string,
    name: body.name as string
  } as IGuessInput;
  if (!guessInput.userId) {
    throw new Error('The field: userId is required.');
  }
  if (!guessInput.nameTargetId) {
    throw new Error('The field: nameTargetId is required.');
  }
  return guessInput;
};

const toCreatedGuessDto = (guess: guessesModel.IGuessModel) => {
  return {
    id: guess._id,
    userId: guess.userId,
    nameTargetId: guess.nameTargetId,
    name: guess.name,
    isCorrect: guess.isCorrect
  };
};

const addGuess = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const guessInput = parseGuessFromBody(req.body);
    const nameTarget = await nameTargetModel.findNameTarget(
      guessInput.nameTargetId
    );
    if (!nameTarget) {
      throw new Error('Name target does not exist.');
    }
    const createGuessInput: guessesModel.ICreateGuess = {
      userId: guessInput.userId,
      name: guessInput.name,
      nameTargetId: guessInput.nameTargetId,
      isCorrect: guessInput.name === nameTarget.name
    };
    const createdGuess = await guessesModel.createGuess(createGuessInput);
    return res.status(HttpStatus.OK).json(toCreatedGuessDto(createdGuess));
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
};

const toGuessesDto = (guess: guessesModel.IGuessModel) => {
  return {
    id: guess._id,
    userId: guess.userId,
    nameTargetId: guess.nameTargetId,
    name: guess.name
  };
};

const getGuesses = async (req: Request, res: Response) => {
  try {
    const nameTargetId = req.query.nameTargetId as string;
    if (!nameTargetId) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'The parameter nameTargetId is required.' });
    }
    const guesses = await guessesModel.getGuesses(nameTargetId);
    return res.status(HttpStatus.OK).json({
      results: guesses.map((guess) => toGuessesDto(guess))
    });
  } catch (error) {
    return res.status(HttpStatus.SERVER_ERROR).json(error);
  }
};

export default { addGuess, getGuesses };
