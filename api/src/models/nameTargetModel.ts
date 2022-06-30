import { model, Schema, Model, Document } from 'mongoose';

export interface INameTargetInput {
  userId: String;
  name: String;
}

export interface INameTargetModel extends Document {
  userId: String;
  name: String;
}

export const NameTargetsSchema: Schema<INameTargetModel> = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true }
});

export const NameTargets: Model<INameTargetModel> = model(
  'NameTargets',
  NameTargetsSchema
);

export const createNameTarget = (guess: INameTargetInput) => {
  return NameTargets.create(guess);
};

export const getNameTargets = async () => {
  return NameTargets.find({});
};
