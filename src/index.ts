import express from 'express';
const dotenv = require('dotenv').config();

import fileRouter from './routes/file.router';
import { connectDB } from './services/db.service';
import { CronJobService } from './services/cronJob.service';
import { saveLatesResponse } from './services/getData.service';
import { errorLogger, requestLogger } from './middlewares/loger.middleware';
import logger from './services/logger.service';

const PORT = process.env.PORT || 5000;
const app = express();
connectDB();

app.use(requestLogger);
app.use('/api/files', fileRouter);
app.use(errorLogger);

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);

    saveLatesResponse();
    const cronJobService = new CronJobService('*/1 * * * *', saveLatesResponse);
    cronJobService.startCronJob();
});
