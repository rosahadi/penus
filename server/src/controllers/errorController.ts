import AppError from '../utils/appError';

const handleCastErroDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDublicateFieldsDB = (err) => {
  const value = err.errorResponse.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `The value '${value}' is already in use. Please choose a different value.`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: unknown) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  console.log(errors);
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

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
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

module.exports = (err, req, res, next) => {
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
