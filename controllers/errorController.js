// new AppError(`Can't find ${req.originalUrl} on this server.`);
const AppError = require('../utils/appError');

const handleJWTError = () => {
  return new AppError('Invalid token. Please log in again!', 401);
};

const handleJWTExpired = () => {
  return new AppError('Your token has expired. Please log in again!', 401);
};

const handleCastErrorDb = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateErrorDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorForDev = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    console.error('ERROR API', err);
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  // ====================================================//
  // RENDERED WEBSITE
  console.error('ERROR RENDER', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  });
};

const sendErrorProduction = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    // Operational Error that we trust: send msg to the client.
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
      // Programming or unknown error: don't leak error details.
    }

    return res.status(500).json({
      status: 'Error',
      message: 'Something is very wrong!',
    });
  }
  // ====================================================//
  // RENDERED WEBSITE
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
    // Programming or unknown error: don't leak error details.
  }

  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong',
    msg: 'Please try again!',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorForDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'CastError') error = handleCastErrorDb(error);
    if (error.code === 1100) error = handleDuplicateErrorDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpired();

    sendErrorProduction(error, req, res);
  }
};
