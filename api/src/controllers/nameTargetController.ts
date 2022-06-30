import { Request, Response } from 'express';
import { HttpStatus } from '../utils/httpUtils';
import * as nameTargetModel from '../models/nameTargetModel';

const toDto = (nameTarget: nameTargetModel.INameTargetModel) => {
  return {
    id: nameTarget._id,
    userId: nameTarget.userId,
    name: nameTarget.name
  };
};

const createNameTarget = async (req: Request, res: Response) => {
  try {
    const inputGuess: nameTargetModel.INameTargetInput = {
      userId: req.body.userId as String,
      name: req.body.name as String
    };
    const createdGuess = await nameTargetModel.createNameTarget(inputGuess);
    return res.status(HttpStatus.OK).json(toDto(createdGuess));
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
};

const getNameTargets = async (req: Request, res: Response) => {
  const nameTargets = await nameTargetModel.getNameTargets();
  return res.status(HttpStatus.OK).json({
    results: nameTargets.map((target) => toDto(target))
  });
};

export default { createNameTarget, getNameTargets };
