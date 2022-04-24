import { RequestHandler } from 'express';
import { verifyJWT } from '../modules/auth/auth.utils';

const deserializeUser: RequestHandler = (req, res, next) => {
    const accessToken = (
        req.headers.authorization ||
        req.cookies.accessToken ||
        ''
    ).replace('Bearer ', '');

    if (!accessToken) {
        return next();
    }

    const decoded = verifyJWT(accessToken);
    if (decoded) res.locals.user = decoded;

    return next();
};

export default deserializeUser;
