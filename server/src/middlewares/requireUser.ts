import { RequestHandler } from 'express';
import AppError from '../utils/appError';

const requireUser: RequestHandler = (req, res, next) => {
    const { user } = res.locals;

    if (!user) {
        return next(
            new AppError('You are not authorized to perform this action', 403)
        );
    }

    return next();
};

export default requireUser;
