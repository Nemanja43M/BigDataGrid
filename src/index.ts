import express, { NextFunction, Request, Response } from 'express';
const dotenv = require('dotenv').config();

import fileRouter from './routes/file.router';
import { connectDB } from './services/db.service';
import { CronJobService } from './services/cronJob.service';
import { saveLatesResponse } from './services/getData.service';

const PORT = process.env.PORT || 5000;
const app = express();
connectDB();

app.use('/api/files', fileRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    saveLatesResponse();
    const cronJobService = new CronJobService('*/1 * * * *', saveLatesResponse);
    cronJobService.startCronJob();
});
