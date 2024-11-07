import { NextFunction, Request, Response } from 'express';
import * as factory from './handlerFactory';
import Comment from '../models/commentModel';
import AppError from '../utils/appError';
import { UserDocument } from '../types';

export const setBlogUserIds = (
  req: Request & { user?: UserDocument },
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.blog) req.body.blog = req.params.id;

  if (!req.user) {
    return next(new AppError('User is not authenticated', 401));
  }

  if (!req.body.user) req.body.user = req.user.id;
  next();
};

export const getAllComments = factory.getAll(Comment);
export const getComment = factory.getOne(Comment);
export const createComment = factory.createOne(Comment);
export const updateComment = factory.updateOne(Comment);
export const deleteComment = factory.deleteOne(Comment);
