import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { CORS_ORIGIN } from './constants';
import logger from './utils/logger';
import { connectDb, disconnectDb } from './utils/database';

import userRoutes from './modules/user/user.route';
import authRoutes from './modules/auth/auth.route';
import globalErrorHandler from './modules/error/error.controller';

require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: CORS_ORIGIN,
        credentials: true,
    })
);
app.use(helmet());

app.use(morgan('dev'));

// routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);

app.use(globalErrorHandler);

const server = app.listen(PORT, async () => {
    await connectDb();
    logger.info(`Listening on port ${PORT}`);
});

const signals = ['SIGINT', 'SIGTERM'];

function gracefulShutdown(signal: string) {
    process.on(signal, async () => {
        logger.info(`Received ${signal}, exiting gracefully`);
        server.close();

        await disconnectDb();
        logger.info('Closed out remaining connections.');
        process.exit(0);
    });
}

signals.forEach(gracefulShutdown);
