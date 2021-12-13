import { Router } from 'express';
import {
  newAnswer,
  newQuestion,
  newUser,
} from '../controllers/questionController';

const router = Router();

router.post('/questions', newQuestion);
router.post('/users', newUser);
router.post('/questions/:id', newAnswer);

export default router;
