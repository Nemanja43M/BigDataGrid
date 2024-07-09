import { Router } from 'express';
import { dataFileHandler } from '../controller/file.controller';

const router = Router();

router.get('/', dataFileHandler);

export default router;
