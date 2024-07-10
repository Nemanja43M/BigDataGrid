import { Router } from 'express';
import { dataFileHandler } from '../controllers/file.controller';

const router = Router();

router.get('/', dataFileHandler);

export default router;
