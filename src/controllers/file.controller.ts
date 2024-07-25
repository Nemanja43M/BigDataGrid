import { RequestHandler } from 'express';
import { fileRepository } from '../repositories/file.repository';

export const dataFileHandler: RequestHandler = async (req, res, next) => {
    try {
        const data = await fileRepository.get();
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    } catch (error) {
        return res.status(500).json({
            error: {
                statusCode: 500,
                message: 'Internal Server Error',
            },
        });
    }
};
