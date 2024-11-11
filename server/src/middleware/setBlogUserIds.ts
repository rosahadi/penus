import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';
import { UserDocument } from '../types';

const setBlogUserIds = (
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

export default setBlogUserIds;
