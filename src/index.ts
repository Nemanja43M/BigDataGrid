import express, { NextFunction, Request, Response } from 'express';
var dotenv = require('dotenv').config();

import fileRouter from './routes/file.router';
import { connectDB } from './services/db.service';

const app = express();
connectDB();

app.use('/api/files', fileRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
