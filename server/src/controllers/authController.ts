import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';

import User from '../models/userModel';
import { ErrorType, UserDocument } from '../types';
import AppError from '../utils/appError';
import catchAsync from '../middleware/catchAsync';
import createSendToken from '../utils/createSendToken';
import {
  validateEmail,
  validateName,
  validatePassword,
} from '../utils/validation';
import { Email } from '../utils/email';
import currentUser from '../utils/currentUser';

const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';

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

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  let errors: ErrorType = {};

  // Validate email and password
  errors.email = await validateEmail(email, User, false);
  if (!password) {
    errors.password = 'Please provide password!';
  }

  // Filter out undefined values
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  errors = Object.fromEntries(Object.entries(errors).filter(([_, v]) => v));

  // If there are any errors, return them
  if (Object.keys(errors).length > 0) {
    return next(new AppError(JSON.stringify(errors), 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // Send token and response to the user
  createSendToken(user, 200, res);
});

// Controller for logging out a user
export const logout = (_req: Request, res: Response) => {
  // Clear the JWT token by setting it to 'loggedout'
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: 'success' });
};

// Controller for handling forgotten passwords
export const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  try {
    // Create a reset URL and email the user with the reset instructions
    const resetURL = `${clientUrl}/reset-password/${resetToken}`;

    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (error) {
    console.error('Failed to send email:', error);
    // If email fails, reset the token and expiration fields
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500,
      ),
    );
  }
});

export const resetPassword = catchAsync(
  async (req: Request & { user?: UserDocument }, res, next) => {
    // Get user based on the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    let errors: ErrorType = {};

    // Check if the token is valid
    if (!user) {
      errors.token = 'Token is invalid or has expired';
      return next(new AppError(JSON.stringify(errors), 400));
    }

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

    // Update the user's password and clear the reset token and expiration
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // Send token and response to the user
    createSendToken(user, 200, res);
  },
);

// Controller for updating a user's password while logged in
export const updatePassword = catchAsync(
  async (req: Request & { user?: UserDocument }, res, next) => {
    const { passwordCurrent, password, passwordConfirm } = req.body;

    if (!req.user) {
      return next(new AppError('User is not authenticated', 401));
    }

    const user = await User.findById(req.user.id).select('+password');

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    let errors: ErrorType = {};

    // Check if the current password is provided and is correct
    if (!passwordCurrent) {
      errors.passwordCurrent = 'Please provide your current password.';
    } else if (!(await user.correctPassword(passwordCurrent))) {
      errors.passwordCurrent = 'Your current password is wrong.';
    }

    // Validate new password and confirmation
    errors = { ...errors, ...validatePassword(password, passwordConfirm) };

    // Filter out undefined values
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    errors = Object.fromEntries(Object.entries(errors).filter(([_, v]) => v));

    // If there are any errors, return them
    if (Object.keys(errors).length > 0) {
      return next(new AppError(JSON.stringify(errors), 400));
    }

    // Update the user's password
    user.password = password;
    user.passwordConfirm = passwordConfirm;
    await user.save();

    createSendToken(user, 200, res);
  },
);

// Middleware to protect routes and restrict access to logged-in users
export const protect = catchAsync(
  async (req: Request & { user?: UserDocument }, res, next) => {
    // Get current user
    const user = await currentUser(req);

    // Attach user to the request and response objects
    req.user = user;
    res.locals.user = user;
    next();
  },
);

// Middleware to restrict access to specific roles
export const restrictTo = (...roles: string[]) => {
  return (
    req: Request & { user?: UserDocument },
    _res: Response,
    next: NextFunction,
  ) => {
    if (!req.user) {
      return next(new AppError('User is not authenticated', 401));
    }

    // Check if the user's role is authorized
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }

    next();
  };
};

// Controller to check token validity and get the users information
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const checkAuthAndGetUser = catchAsync(async (req, res, next) => {
  try {
    // Verify token and get current user
    const user = await currentUser(req);

    // Return user data along with token validity
    return res.status(200).json({
      isValid: true,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      },
    });
  } catch {
    // Token is invalid or expired
    return res.status(401).json({ isValid: false, user: null });
  }
});
