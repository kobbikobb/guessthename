import { Request, Response } from 'express';
import { HttpStatus } from '../utils/httpUtils';
import * as nameTargetModel from '../models/nameTargetModel';

interface ICreatedNameTargetDto {
  id: string;
  userId: string;
  title: string;
  name: string;
  createdAt: Date;
}

interface INameTargetDto {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
}

const toDtoCreate = (
  nameTarget: nameTargetModel.INameTargetModel
): ICreatedNameTargetDto => {
  return {
    id: nameTarget._id,
    userId: nameTarget.userId,
    title: nameTarget.title,
    name: nameTarget.name,
    createdAt: nameTarget.createdAt
  };
};

const toDtoList = (
  nameTarget: nameTargetModel.INameTargetModel
): INameTargetDto => {
  return {
    id: nameTarget._id,
    userId: nameTarget.userId,
    title: nameTarget.title,
    createdAt: nameTarget.createdAt
  };
};

const createNameTarget = async (req: Request, res: Response): Promise<any> => {
  try {
    const inputGuess: nameTargetModel.INameTargetInput = {
      userId: req.body.userId,
      title: req.body.title,
      name: req.body.name
    };
    const createdGuess = await nameTargetModel.createNameTarget(inputGuess);
    return res.status(HttpStatus.OK).json(toDtoCreate(createdGuess));
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
};

const getNameTargets = async (req: Request, res: Response): Promise<any> => {
  const nameTargets = await nameTargetModel.getNameTargets();
  return res.status(HttpStatus.OK).json({
    results: nameTargets.map((target) => toDtoList(target))
  });
};

export default { createNameTarget, getNameTargets };
