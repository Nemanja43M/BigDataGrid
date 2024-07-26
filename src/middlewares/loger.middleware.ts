import expressWinston from 'express-winston';
import { NextFunction, Request, Response } from 'express';
import logger from '../services/logger.service';

export const requestLogger = expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: false,
    ignoreRoute: (req, res) => false,
});

export const errorLogger = expressWinston.errorLogger({
    winstonInstance: logger,
});

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.error(err.message, { metadata: { stack: err.stack } });
    res.status(500).json({ message: err.message });
};
