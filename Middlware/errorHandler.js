const {AppError} = require('../Utils/appError');

const sendErrorOnDev = (error,res) => {
    const statusCode = error.statusCode || 500;
    const status = error.status || 'error';
    const message = error.message;
    const stack = error.stack;

    res.status(statusCode).json({
        status,
        message,
        stack,
    });
}
const globalErrorHandler = (err, req, res, next) => {
    if (err.name === 'JsonWebTokenError') {
        err = new AppError('Invalid token', 401);
    }
    if (err.name === 'SequelizeValidationError') {
        err = new AppError(err.errors[0].message, 400);
    }
    if (err.name === 'SequelizeUniqueConstraintError') {
        err = new AppError(err.errors[0].message, 400);
    }
    if (process.env.NODE_ENV === 'development') {
        return sendErrorDev(err, res);
    }
    sendErrorProd(err, res);
};


module.exports = {globalErrorHandler}