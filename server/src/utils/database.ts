import mongoose from 'mongoose';
import logger from './logger';

const dbConnectionString =
    process.env.DB_CONNECTION_STRING ||
    'mongodb://localhost:27017/youtube-clone';

export const connectDb = async () => {
    try {
        await mongoose.connect(dbConnectionString);
        logger.info('Connected to MongoDB');
    } catch (error) {
        logger.error(error, 'Error connecting to MongoDB');
        process.exit(1);
    }
};

export const disconnectDb = async () => {
    try {
        await mongoose.connection.close();
        logger.info('Disconnected from MongoDB');
    } catch (error) {
        logger.error(error, 'Error disconnecting from MongoDB');
        process.exit(1);
    }
};
