import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

// TODO: Need to complete this function, to send proper error response, both in development and production environment.

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message,
        stack: err.stack,
        error: err,
    });
};

export default globalErrorHandler;
