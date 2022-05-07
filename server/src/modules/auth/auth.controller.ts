/* eslint-disable consistent-return */
import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import omit from '../../helpers/omit';
import AppError from '../../utils/appError';
import { findUserByEmail } from '../user/user.service';
import { LoginSchema } from './auth.schema';
import { signJWT } from './auth.utils';

export const loginHandler = expressAsyncHandler<{}, {}, LoginSchema>(
    async (req, res, next) => {
        const { email, password } = req.body;

        // find the user by email
        const user = await findUserByEmail(email);
        // if user is not found, return error
        if (!user || !(await user.comparePassword(password))) {
            return next(
                new AppError(
                    'Invalid email or password',
                    StatusCodes.UNAUTHORIZED
                )
            );
        }
        // generate token
        const payload = omit(user.toJSON(), [
            'password',
            'comparePassword',
            '__v',
        ]);
        const jwt = signJWT(payload);

        // add cookie to response
        res.cookie('accessToken', jwt, {
            httpOnly: true,
            maxAge: 3.154e10, // 1 year
            domain: process.env.COOKIE_DOMAIN || 'localhost',
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        });

        // send the response
        res.status(StatusCodes.OK).json({
            message: 'Login successful',
            data: {
                token: jwt,
                user: payload,
            },
        });
    }
);

export const logoutHandler = expressAsyncHandler(async (req, res) => {
    res.clearCookie('accessToken', {
        domain: process.env.COOKIE_DOMAIN || 'localhost',
        path: '/',
    });

    res.status(StatusCodes.OK).json({
        message: 'Logout successful',
        data: null,
    });
});
