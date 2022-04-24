import express from 'express';
import { processRequestBody } from 'zod-express-middleware';
import requireUser from '../../middlewares/requireUser';
import { registerUserHandler } from './user.controller';
import { registerUserSchema } from './user.schema';

const router = express.Router();

router.post(
    '/',
    processRequestBody(registerUserSchema.body),
    registerUserHandler
);

router.get('/me', requireUser, (req, res) => {
    res.json(res.locals.user);
});

export default router;
