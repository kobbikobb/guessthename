import { model, Schema, Model, Document } from 'mongoose';

export interface ICreateGuess {
  userId: String;
  nameTargetId: String;
  name: String;
  isCorrect: boolean;
}

export interface IGuessModel extends Document {
  userId: String;
  nameTargetId: String;
  name: String;
  isCorrect: boolean;
  // TODO: ADD Time
}

export const GuessesSchema: Schema<IGuessModel> = new Schema({
  userId: { type: String, required: true },
  nameTargetId: { type: String, required: true },
  name: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
});

export const Guesses: Model<IGuessModel> = model('Guesses', GuessesSchema);

export const createGuess = (guess: ICreateGuess) => {
  return Guesses.create(guess);
};

export const getGuesses = async (nameTargetId: any) => {
  return Guesses.find({ nameTargetId: nameTargetId + '' });
};
