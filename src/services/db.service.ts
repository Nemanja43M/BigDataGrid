import mongoose from 'mongoose';

const mongoUri =
    process.env.MONGO_URI || ' mongodb://root:example@mongo:27017/';

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1);
    }
};
