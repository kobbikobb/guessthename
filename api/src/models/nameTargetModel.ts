import { model, Schema, Model, Document, Types } from 'mongoose';

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

export const findNameTarget = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }
  return NameTargets.findById(new Types.ObjectId(id));
};
