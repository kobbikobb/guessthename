import { model, Schema, Model } from 'mongoose';

export interface IGuessInput {
  userId: String;
  name: String;
  isCorrect: boolean;
}

export interface IGuessModel extends Document {
  userId: String;
  name: String;
  isCorrect: boolean;
}

export const GuessesSchema: Schema<IGuessModel> = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
});

export const Guesses: Model<IGuessModel> = model('Guesses', GuessesSchema);

export const createGuess = (guess: IGuessInput) => {
  return Guesses.create(guess);
};

export const getGuesses = async () => {
  return Guesses.find({});
};
