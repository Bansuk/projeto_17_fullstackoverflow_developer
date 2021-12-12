import { Router } from 'express';

import { newQuestion } from '../controllers/questionController';

const router = Router();

router.post('/questions', newQuestion);

export default router;
