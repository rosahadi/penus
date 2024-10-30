import { Model } from 'mongoose';
import { UserDocument } from '../types';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type UserModel = Model<UserDocument>;

export const validateEmail = async (
  email: string,
  User: UserModel,
  isSignup = true,
) => {
  let error;
  if (!email) {
    error = 'Please provide your email.';
  } else if (!emailRegex.test(email)) {
    error = 'Please provide a valid email format.';
  } else if (isSignup) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      error = 'This email is already in use. Please use another email.';
    }
  }
  return error;
};

export const validatePassword = (password: string, passwordConfirm: string) => {
  const errors: { password?: string; passwordConfirm?: string } = {};

  if (!password) {
    errors.password = 'Please provide a password.';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  }

  if (!passwordConfirm) {
    errors.passwordConfirm = 'Please confirm your password.';
  } else if (password !== passwordConfirm) {
    errors.passwordConfirm = 'Passwords do not match.';
  }

  return errors;
};

export const validateName = (name: string) => {
  if (!name) {
    return 'Please provide your name.';
  }
};
