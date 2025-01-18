import { Request, Response } from 'express';
import catchAsync from '../middleware/catchAsync';
import SavedBlog from '../models/saveBlogModel';
import * as factory from './handlerFactory';
import currentUser from '../utils/currentUser';
import AppError from '../utils/appError';

export const saveBlog = factory.createOne(SavedBlog);

export const deleteSavedBlog = catchAsync(
  async (req: Request, res: Response, next) => {
    const user = await currentUser(req);

    req.body.user = user;
    const savedBlog = await SavedBlog.findOneAndDelete(req.body);

    if (!savedBlog) {
      return next(
        new AppError('No saved blog found with that user and blog ID', 404),
      );
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  },
);

export const getSavedBlogs = catchAsync(async (req: Request, res: Response) => {
  const user = await currentUser(req);

  req.body.user = user;

  const savedBlogs = await SavedBlog.find({ user }).populate('blog');

  res.status(200).json({
    status: 'success',
    results: savedBlogs.length,
    data: savedBlogs,
  });
});
