import { model, Schema, Model, Document } from 'mongoose';

export interface INameTargetInput {
  userId: String;
  name: String;
}

export interface INameTargetModel extends Document {
  _id: String;
  userId: String;
  name: String;
}

export const NameTargetsSchema: Schema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true }
});

export const NameTargets: Model<INameTargetModel> = model(
  'NameTargets',
  NameTargetsSchema
);

export const createNameTarget = (
  guess: INameTargetInput
): Promise<INameTargetModel> => {
  return NameTargets.create(guess);
};

export const getNameTargets = async (): Promise<Array<INameTargetModel>> => {
  return NameTargets.find({});
};
