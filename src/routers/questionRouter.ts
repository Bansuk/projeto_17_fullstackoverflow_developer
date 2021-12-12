import { Router } from 'express';

import { newQuestion, newUser } from '../controllers/questionController';

const router = Router();

router.post('/questions', newQuestion);
router.post('/users', newUser);

export default router;
