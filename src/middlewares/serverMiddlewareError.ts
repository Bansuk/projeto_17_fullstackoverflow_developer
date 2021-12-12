/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import QuestionError from '../errors/QuestionError';

export default async function (
  err: QuestionError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('Middleware de erro: ', err);
  return res.sendStatus(500);
}
