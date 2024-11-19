import { Request } from 'express';
import User from '../models/userModel';
import { UserDocument } from '../types';
import catchAsync from '../middleware/catchAsync';
import filterObj from '../utils/filterObj';
import { deleteOne, getAll, getOne, updateOne } from './handlerFactory';
import AppError from '../utils/appError';
import LikedBlog from '../models/likedBlogsModel';
import Blog from '../models/blogModel';
import Comment from '../models/commentModel';

export const getUser = getOne(User);

export const getAllUsers = getAll(User);

// Do NOT update passwords with this, this is only for admin
export const updateUser = updateOne(User);
export const deleteUser = deleteOne(User);
//

// Users Updating and Deleting their account

export const updateMe = catchAsync(
  async (req: Request & { user?: UserDocument }, res, next) => {
    // Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email', 'image');

    if (!req.user) {
      return next(new AppError('User is not authenticated', 401));
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  },
);

export const deleteMe = catchAsync(
  async (req: Request & { user?: UserDocument }, res, next) => {
    if (!req.user) {
      return next(new AppError('User is not authenticated', 401));
    }

    // Delete all likes associated with the user
    await LikedBlog.deleteMany({ user: req.user._id });

    // Find all blogs by the user
    const userBlogs = await Blog.find({ user: req.user._id });

    // Delete all comments on user's blogs
    await Comment.deleteMany({
      blog: { $in: userBlogs.map((blog) => blog._id) },
    });

    // Delete all user's blogs
    await Blog.deleteMany({ user: req.user._id });

    // Soft delete the user or permanently delete based on your requirements
    await User.findByIdAndDelete(req.user._id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  },
);

// Search for users
export const searchUsers = catchAsync(async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(200).json({
      status: 'success',
      data: {
        users: [],
      },
    });
  }

  // Search regex that is case-insensitive
  const searchRegex = new RegExp(String(query), 'i');

  const users = await User.find({
    name: searchRegex,
    active: { $ne: false },
  }).select('name image');

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});
