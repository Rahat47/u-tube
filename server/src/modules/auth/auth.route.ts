import express from 'express';
import { processRequestBody } from 'zod-express-middleware';
import { loginHandler, logoutHandler } from './auth.controller';
import { loginSchema } from './auth.schema';

const router = express.Router();

router.post('/', processRequestBody(loginSchema.body), loginHandler);

// logout route
router.post('/logout', logoutHandler);

export default router;
