import jwt from 'jsonwebtoken';
import AppError from './appError';
import { promisify } from 'util';
import User from '../models/userModel';
import { Request } from 'express';

// Define the shape of your JWT payload
interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
}

// Create a type guard to check if a value is a JwtPayload
function isJwtPayload(decoded: unknown): decoded is JwtPayload {
  return (
    typeof decoded === 'object' &&
    decoded !== null &&
    'id' in decoded &&
    'iat' in decoded &&
    typeof (decoded as Record<string, unknown>).id === 'string' &&
    typeof (decoded as Record<string, unknown>).iat === 'number'
  );
}

const currentUser = async (req: Request) => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    throw new AppError(
      'You are not logged in! Please log in to get access.',
      401,
    );
  }

  // Use a type assertion for the promisified jwt.verify
  const decoded = await (
    promisify(jwt.verify) as (
      token: string,
      secret: string,
    ) => Promise<jwt.JwtPayload>
  )(token, process.env.JWT_SECRET!);

  // Type guard to ensure decoded has the correct shape
  if (!isJwtPayload(decoded)) {
    throw new AppError('Invalid token payload', 401);
  }

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    throw new AppError(
      'The user belonging to this token does no longer exist.',
      401,
    );
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    throw new AppError(
      'User recently changed password! Please log in again.',
      401,
    );
  }

  return currentUser;
};

export default currentUser;
