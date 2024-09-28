import { model, Schema, Model, Document, Types } from 'mongoose';

export interface INameTargetInput {
    userId: string;
    title: string;
    name: string;
}

export interface INameTargetModel extends Document {
    userId: string;
    title: string;
    name: string;
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

export const createNameTarget = async (
    guess: INameTargetInput
): Promise<INameTargetModel> => {
    return await NameTargets.create(guess);
};

export const getNameTargets = async (): Promise<INameTargetModel[]> => {
    return await NameTargets.find({});
};

export const findNameTarget = async (
    id: string
): Promise<INameTargetModel | null> => {
    if (!Types.ObjectId.isValid(id)) {
        return null;
    }
    return await NameTargets.findById(new Types.ObjectId(id));
};
