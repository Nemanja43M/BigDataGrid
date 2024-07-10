import express, { NextFunction, Request, Response } from 'express';

import fileRouter from './routes/file.router';

const app = express();

app.use('/api/files', fileRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
