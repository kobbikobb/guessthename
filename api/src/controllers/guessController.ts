import { Request, Response } from 'express';
import { HttpStatus } from '../utils/httpUtils';
import * as nameTargetModel from '../models/nameTargetModel';
import * as guessesModel from '../models/guessesModel';
import { badRequest } from '../utils/errors';

export interface IGuessInput {
  userId: string;
  name: string;
  nameTargetId: string;
}

interface ICreatedGuessDto {
  id: string;
  userId: string;
  nameTargetId: string;
  name: string;
  isCorrect: boolean;
}

interface IGuessDto {
  id: string;
  userId: string;
  nameTargetId: string;
  name: string;
}

const parseGuessFromBody = (req: Request): IGuessInput => {
  const guessInput: IGuessInput = {
    userId: req.body.userId as string,
    nameTargetId: req.body.nameTargetId as string,
    name: req.body.name as string
  };
  if (guessInput.userId === '') {
    throw badRequest('The field: userId is required.');
  }
  if (guessInput.nameTargetId === '') {
    throw badRequest('The field: nameTargetId is required.');
  }
  if (guessInput.name === '') {
    throw badRequest('The field: name is required.');
  }
  return guessInput;
};

const toCreatedGuessDto = (
  guess: guessesModel.IGuessModel
): ICreatedGuessDto => {
  return {
    id: guess.id,
    userId: guess.userId,
    nameTargetId: guess.nameTargetId,
    name: guess.name,
    isCorrect: guess.isCorrect
  };
};

const addGuess = async (req: Request, res: Response): Promise<Response> => {
  const guessInput = parseGuessFromBody(req);
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
  const createdGuess = await guessesModel.createGuess(createGuessInput);
  return res.status(HttpStatus.OK).json(toCreatedGuessDto(createdGuess));
};

const toGuessesDto = (guess: guessesModel.IGuessModel): IGuessDto => {
  return {
    id: guess._id,
    userId: guess.userId,
    nameTargetId: guess.nameTargetId,
    name: guess.name
  };
};

const getGuesses = async (req: Request, res: Response): Promise<Response> => {
  const nameTargetId = req.query.nameTargetId as string;
  if (nameTargetId === undefined) {
    throw badRequest('The parameter nameTargetId is required.');
  }
  const guesses = await guessesModel.getGuesses(nameTargetId);
  return res.status(HttpStatus.OK).json({
    results: guesses.map((guess) => toGuessesDto(guess))
  });
};

export default { addGuess, getGuesses };
