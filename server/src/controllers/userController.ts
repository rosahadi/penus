import { Request } from 'express';
import User from '../models/userModel';
import { UserDocument } from '../types';
import catchAsync from '../middleware/catchAsync';
import filterObj from '../utils/filterObj';
import { deleteOne, getAll, getOne, updateOne } from './handlerFactory';
import AppError from '../utils/appError';

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

    // Update the user to set 'active' to false when they delete themselves
    const user = await User.findByIdAndDelete(req.user.id);

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  },
);
