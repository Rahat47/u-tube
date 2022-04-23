import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secretPasswordBlaBlaBla';
const options: jwt.SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
};

export const signJWT = (payload: string | Buffer | Object) =>
    jwt.sign(payload, JWT_SECRET, options);

export const verifyJWT = (token: string) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
};
