import { model, Schema, Model, Document } from 'mongoose';

export interface IGuess extends Document {
  userId: String;
  name: String;
}

export const GuessesSchema: Schema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true }
});

export const Guesses: Model<IGuess> = model('Guesses', GuessesSchema);

export const createGuess = (guess: IGuess) => {
  return Guesses.create(guess);
};

export const getGuesses = async () => {
  // TODO: Add pagination
  return Guesses.find({});
};
