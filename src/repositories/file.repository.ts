import File from '../models/fileModel';
import logger from '../services/logger.service';

export const fileRepository = {
    async save(data: Record<string, any>) {
        try {
            const file = new File({ data });
            await file.save();
        } catch (error) {
            throw new Error('Failed to save file to the database');
        }
    },

    async get() {
        try {
            return await File.find().exec();
        } catch (error) {
            throw new Error('Failed to fetch files from the database');
        }
    },
    async clear() {
        try {
            await File.deleteMany();
        } catch (error) {
            throw new Error('Failed to clear files from the database');
        }
    },
};
