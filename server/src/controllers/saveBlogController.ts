import { Request, Response } from 'express';
import catchAsync from '../middleware/catchAsync';
import SavedBlog from '../models/saveBlogModel';
import * as factory from './handlerFactory';
import currentUser from '../utils/currentUser';

export const saveBlog = factory.createOne(SavedBlog);

export const deleteSavedBlog = factory.deleteOne(SavedBlog);

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
