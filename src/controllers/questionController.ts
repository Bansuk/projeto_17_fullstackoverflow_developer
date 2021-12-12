import { Request, Response, NextFunction } from 'express';
import { QuestionInput } from '../interfaces/question';
import { isQuestionInputValid } from '../validations/questionValidation';
import * as questionService from '../services/questionService';

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

export { newQuestion };
