import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../utils/httpUtils';
import * as guessesModel from '../models/guessesModel';

const getGuesses = async (req: Request, res: Response) => {
  const guesses = await guessesModel.getGuesses();
  return res.status(HttpStatus.OK).json({
    results: guesses
  });
};

// TODO: Add pagination
const addGuess = async (req: Request, res: Response, next: NextFunction) => {
  const inputGuess = req.body as guessesModel.IGuess;
  const createdGuess = await guessesModel.createGuess(inputGuess);
  return res.status(HttpStatus.OK).json(createdGuess);
};

export default { addGuess, getGuesses };
