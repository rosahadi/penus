/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';
import mongoose from 'mongoose';

const handleCastErroDB = (err: mongoose.Error.CastError) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDublicateFieldsDB = (err: any) => {
  const value = err.errorResponse.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `The value '${value}' is already in use. Please choose a different value.`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: mongoose.Error.ValidationError) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `${errors.join(', ')}.`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError(
    'Your session has expired or is invalid. Please log in again.',
    401,
  );

const handleJWTExpiredError = () =>
  new AppError(
    'Your session has expired. Please log in again to continue.',
    401,
  );

const sendErrorDev = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: any, res: Response) => {
  // Operational, trusted error : send message to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error
  } else {
    console.error('ERROR 💥', err);

    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = Object.create(err);

    if (error.name === 'CastError') error = handleCastErroDB(error);
    if (error.code === 11000) error = handleDublicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'JsonExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};

export default globalErrorHandler;
