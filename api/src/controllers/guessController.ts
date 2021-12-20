import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../utils/httpUtils';

interface IGuess {
  userId: String;
  value: String;
}

// TODO: Read from DB
const guesses = Array<IGuess>();

const getGuesses = async (req: Request, res: Response) => {
  return res.status(HttpStatus.OK).json({
    guesses
  });
};

// TODO: Add pagination
const addGuess = async (req: Request, res: Response, next: NextFunction) => {
  const inputGuess = req.body as IGuess;
  guesses.push(inputGuess);
  return res.status(HttpStatus.OK).json(inputGuess);
};

export default { addGuess, getGuesses };
