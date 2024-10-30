import dotenv from 'dotenv';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserDocument } from '../types';
import mongoose from 'mongoose';

dotenv.config();

const signToken = (id: mongoose.Types.ObjectId) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign({ id }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });
};

const createSendToken = (
  user: UserDocument,
  statusCode: number,
  res: Response,
) => {
  const token = signToken(user._id);

  const cookieExpiresInDays = parseInt(
    process.env.JWT_COOKIE_EXPIRES_IN || '90',
    10,
  );

  const cookieOptions: { expires: Date; httpOnly: boolean; secure?: boolean } =
    {
      expires: new Date(Date.now() + cookieExpiresInDays * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  // Set the cookie with the token ( for postman )
  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export default createSendToken;
