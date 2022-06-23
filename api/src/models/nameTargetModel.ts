import { model, Schema, Model } from 'mongoose';

export interface INameTarget {
  userId: String;
  name: String;
}

export const NameTargetsSchema: Schema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true }
});

export const NameTargets: Model<INameTarget> = model(
  'NameTargets',
  NameTargetsSchema
);

export const createNameTarget = (guess: INameTarget) => {
  return NameTargets.create(guess);
};

export const getNameTargets = async () => {
  return NameTargets.find({});
};
