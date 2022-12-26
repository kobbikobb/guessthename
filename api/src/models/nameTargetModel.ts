import { model, Schema, Model, Document, Types } from 'mongoose';

export interface INameTargetInput {
  userId: string;
  title: string;
  name: string;
}

export interface INameTargetModel extends Document {
  userId: String;
  title: String;
  name: String;
  createdAt: Date;
}

export const NameTargetsSchema: Schema<INameTargetModel> = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    name: { type: String, required: true }
  },
  { timestamps: true }
);

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
