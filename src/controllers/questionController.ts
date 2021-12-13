import { Request, Response, NextFunction } from 'express';
import { QuestionInput } from '../interfaces/question';
import { isQuestionInputValid } from '../validations/questionValidation';
import * as questionService from '../services/questionService';
import { isUserInputValid } from '../validations/userValidation';
import { isAnswerInputValid } from '../validations/answerValidation';

const newQuestion = async (req: Request, res: Response, next: NextFunction) => {
  const { question, student, class: className, tags }: QuestionInput = req.body;

  if (!isQuestionInputValid({ question, student, class: className, tags }))
    return res.sendStatus(400);

  try {
    const questionId: object = await questionService.createQuestion({
      question,
      student,
      class: className,
      tags,
    });
    return res.status(201).send(questionId);
  } catch (error) {
    if (error.name === 'QuestionError')
      return res.status(409).send(error.message);
    next(error);
  }
};

const newUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, class: className } = req.body;

  if (!isUserInputValid({ name, class: className })) return res.sendStatus(400);

  try {
    const token: object = await questionService.createUser({
      name,
      class: className,
    });
    return res.status(201).send(token);
  } catch (error) {
    if (error.name === 'UserError') return res.status(409).send(error.message);
    next(error);
  }
};

const newAnswer = async (req: Request, res: Response, next: NextFunction) => {
  const { answer }: { answer: string } = req.body;

  if (!isAnswerInputValid({ answer })) return res.sendStatus(400);

  const { authorization } = req.headers;
  const token = authorization?.split('Bearer ')[1];

  if (!token) res.sendStatus(401);

  const { id } = req.params;

  try {
    const updatedQuestion: object = await questionService.createAnswer({
      answer,
      id,
      token,
    });
    return res.status(200).send(updatedQuestion);
  } catch (error) {
    if (error.name === 'QuestionError')
      return res.status(409).send(error.message);
    next(error);
  }
};

const getQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const questions = await questionService.retrieveUnansweredQuestions();
    return res.status(200).send(questions);
  } catch (error) {
    if (error.name === 'QuestionError')
      return res.status(404).send(error.message);
    next(error);
  }
};

export { newQuestion, newUser, newAnswer, getQuestions };
