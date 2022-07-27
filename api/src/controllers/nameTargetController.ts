import { Request, Response } from 'express';
import { HttpStatus } from '../utils/httpUtils';
import * as nameTargetModel from '../models/nameTargetModel';

const toDtoCreate = (nameTarget: nameTargetModel.INameTargetModel) => {
  return {
    id: nameTarget._id,
    userId: nameTarget.userId,
    title: nameTarget.title,
    name: nameTarget.name,
    createdAt: nameTarget.createdAt
  };
};

const toDtoList = (nameTarget: nameTargetModel.INameTargetModel) => {
  return {
    id: nameTarget._id,
    userId: nameTarget.userId,
    title: nameTarget.title,
    createdAt: nameTarget.createdAt
  };
};

const createNameTarget = async (req: Request, res: Response) => {
  try {
    const inputGuess: nameTargetModel.INameTargetInput = {
      userId: req.body.userId as String,
      title: req.body.title as String,
      name: req.body.name as String
    };
    const createdGuess = await nameTargetModel.createNameTarget(inputGuess);
    return res.status(HttpStatus.OK).json(toDtoCreate(createdGuess));
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
};

const getNameTargets = async (req: Request, res: Response) => {
  const nameTargets = await nameTargetModel.getNameTargets();
  return res.status(HttpStatus.OK).json({
    results: nameTargets.map((target) => toDtoList(target))
  });
};

export default { createNameTarget, getNameTargets };
