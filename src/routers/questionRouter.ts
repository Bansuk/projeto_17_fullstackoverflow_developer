import { Router } from 'express';
import {
  newAnswer,
  newQuestion,
  newUser,
  getQuestions,
} from '../controllers/questionController';

const router = Router();

router.post('/questions', newQuestion);
router.post('/users', newUser);
router.post('/questions/:id', newAnswer);
router.get('/questions', getQuestions);

export default router;
