import { Request, Response } from 'express';
import { HttpStatus } from '../utils/httpUtils';
import * as guessesModel from '../models/guessesModel';
import { badRequest } from '../utils/errors';
import { addGuess, IGuessInput } from '../utils/guessService';

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

const postGuess = async (req: Request, res: Response): Promise<void> => {
    const guessInput = parseGuessFromBody(req);
    const createdGuess = await addGuess(guessInput);
    res.status(HttpStatus.OK).json(toCreatedGuessDto(createdGuess));
};

const toGuessesDto = (guess: guessesModel.IGuessModel): IGuessDto => {
    return {
        id: guess._id.toString(),
        userId: guess.userId,
        nameTargetId: guess.nameTargetId,
        name: guess.name
    };
};

const getGuesses = async (req: Request, res: Response): Promise<void> => {
    const nameTargetId = req.query.nameTargetId as string;
    if (nameTargetId === undefined) {
        throw badRequest('The parameter nameTargetId is required.');
    }
    const guesses = await guessesModel.getGuesses(nameTargetId);
    res.status(HttpStatus.OK).json({
        results: guesses.map((guess) => toGuessesDto(guess))
    });
};

export default { postGuess, getGuesses };
