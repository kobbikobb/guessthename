import { model, Schema, Model, Document } from 'mongoose';

export interface ICreateGuessInput {
  userId: string;
  nameTargetId: string;
  name: string;
  isCorrect: boolean;
}

export interface ICreateGuess {
  userId: string;
  nameTargetId: string;
  name: string;
  isCorrect: boolean;
  createdAt: Date;
}

export interface IGuessModel extends Document {
  userId: string;
  nameTargetId: string;
  name: string;
  isCorrect: boolean;
  createdAt: Date;
}

export const GuessesSchema: Schema<IGuessModel> = new Schema(
  {
    userId: { type: String, required: true },
    nameTargetId: { type: String, required: true },
    name: { type: String, required: true },
    isCorrect: { type: Boolean, required: true }
  },
  { timestamps: true }
);

export const Guesses: Model<IGuessModel> = model('Guesses', GuessesSchema);

export const createGuess = async (
  guess: ICreateGuessInput
): Promise<IGuessModel> => {
  return await Guesses.create(guess);
};

export const getGuesses = async (
  nameTargetId: string
): Promise<IGuessModel[]> => {
  return await Guesses.find({ nameTargetId });
};
