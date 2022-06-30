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
  try {
    // TODO: Fetch name from db
    const isCorrect = req.body.name === 'HardCodedForNow';
    const inputGuess: guessesModel.IGuessInput = {
      userId: req.body.userId as String,
      name: req.body.name as String,
      isCorrect
    };
    const createdGuess = await guessesModel.createGuess(inputGuess);
    return res.status(HttpStatus.OK).json(createdGuess);
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
};

export default { addGuess, getGuesses };
