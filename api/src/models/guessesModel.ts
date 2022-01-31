import { model, Schema, Model } from 'mongoose';

export interface IGuess {
  userId: String;
  name: String;
  isCorrect: boolean;
}

export const GuessesSchema: Schema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
});

export const Guesses: Model<IGuess> = model('Guesses', GuessesSchema);

export const createGuess = (guess: IGuess) => {
  return Guesses.create(guess);
};

export const getGuesses = async () => {
  // TODO: Add pagination
  return Guesses.find({});
};
