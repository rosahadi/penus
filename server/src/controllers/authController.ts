import User from '../models/userModel';
import { ErrorType } from '../types';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import createSendToken from '../utils/createSendToken';
import {
  validateEmail,
  validateName,
  validatePassword,
} from '../utils/validation';

export const signup = catchAsync(async (req, res, next) => {
  let errors: ErrorType = {};

  // Validate name, email, and password
  errors.name = validateName(req.body.name);
  errors.email = await validateEmail(req.body.email, User);
  errors = {
    ...errors,
    ...validatePassword(req.body.password, req.body.passwordConfirm),
  };

  // Filter out undefined values
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  errors = Object.fromEntries(Object.entries(errors).filter(([_, v]) => v));

  // If there are any errors, return them
  if (Object.keys(errors).length > 0) {
    return next(new AppError(JSON.stringify(errors), 400));
  }

  // Create a new user if validation passes
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // Send token and response to the user
  createSendToken(newUser, 201, res);
});
