import { NextFunction, Request, Response } from 'express';
import * as factory from './handlerFactory';
import Review from '../models/reviewModel';
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

export const getAllReviews = factory.getAll(Review);
export const getReview = factory.getOne(Review);
export const createReview = factory.createOne(Review);
export const updateReview = factory.updateOne(Review);
export const deleteReview = factory.deleteOne(Review);
