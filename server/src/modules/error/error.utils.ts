import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../utils/appError';
import logger from '../../utils/logger';

export const sendProductionError = (err: any, req: Request, res: Response) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            message: 'Something went wrong',
        });
    }
};
export const sendDevelopmentError = (err: any, req: Request, res: Response) => {
    logger.error(err);

    res.status(err.statusCode).json({
        status: err.status,
        code: err.statusCode,
        message: err.message,
        stack: err.stack,
        error: err,
    });
};

export const handleDuplicateKeyError = (err: any) => {
    const key = Object.keys(err.keyValue)[0];
    const value = err.keyValue[key];
    return new AppError(
        `An account with "${key}" "${value}" already exists`,
        StatusCodes.CONFLICT
    );
};
