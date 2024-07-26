import mongoose from 'mongoose';
import logger from './logger.service';

const mongoUri =
    process.env.MONGO_URI || ' mongodb://root:example@mongo:27017/';

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri);
        logger.info('Connected to MongoDB');
    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.error('Error connecting to MongoDB', {
                metadata: { error: err.message, stack: err.stack },
            });
        } else {
            logger.error('Error connecting to MongoDB', {
                metadata: { error: 'Unknown error', stack: '' },
            });
        }
        process.exit(1);
    }
};
