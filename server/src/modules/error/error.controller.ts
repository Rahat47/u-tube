/* eslint-disable no-param-reassign */
import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../../utils/logger';
import {
    handleDuplicateKeyError,
    sendDevelopmentError,
    sendProductionError,
} from './error.utils';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    logger.error(err);
    let error = Object.create(err);
    error.message = err.message || 'Something went wrong';
    error.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    error.status = err.status || 'Server Error';

    if (process.env.NODE_ENV === 'production') {
        if (error.code === 11000) {
            error = handleDuplicateKeyError(error);
        }

        return sendProductionError(error, req, res);
    }

    return sendDevelopmentError(error, req, res);
};

export default globalErrorHandler;
