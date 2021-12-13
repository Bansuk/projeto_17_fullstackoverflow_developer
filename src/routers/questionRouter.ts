import { Router } from 'express';
import {
  newAnswer,
  newQuestion,
  newUser,
  getQuestions,
  getQuestion,
} from '../controllers/questionController';

const router = Router();

router.post('/questions', newQuestion);
router.post('/users', newUser);
router.post('/questions/:id', newAnswer);
router.get('/questions', getQuestions);
router.get('/questions/:id', getQuestion);

export default router;
