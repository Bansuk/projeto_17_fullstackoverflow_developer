import jwt from 'jsonwebtoken';
import { QuestionInput, QuestionUpdate } from '../interfaces/question';
import { UserInput } from '../interfaces/user';
import { rearrangeTags } from '../helpers/questionServiceHelper';
import QuestionError from '../errors/QuestionError';
import * as questionRepository from '../repositories/questionRepository';
import UserError from '../errors/UserError';

const createQuestion = async ({
  question,
  student,
  class: className,
  tags,
}: QuestionInput) => {
  const tagsArray = tags.split(',').map((item: string) => item.trim());
  const doesQuestionAlreadyExist = await questionRepository.findQuestionByText(
    question,
  );

  if (doesQuestionAlreadyExist)
    throw new QuestionError('This question has already been asked.');

  const questionId: number = await questionRepository.insertQuestion({
    question,
    student,
    class: className,
    tags: tagsArray,
  });

  return { id: questionId };
};

const createUser = async ({ name, class: className }: UserInput) => {
  const doesUserAlreadyExist = await questionRepository.findUserByName(name);

  if (doesUserAlreadyExist)
    throw new UserError('This username is already in use.');

  const token = jwt.sign({ name }, process.env.JWT_SECRET);

  await questionRepository.insertUser({ name, class: className, token });

  return { token };
};

const createAnswer = async ({ answer, id, token }: QuestionUpdate) => {
  jwt.verify(token, process.env.JWT_SECRET, (err: Error) => {
    if (err) throw new QuestionError('The provided token is invalid.');
  });

  const doesQuestionExist = await questionRepository.findQuestionById(id);

  if (!doesQuestionExist)
    throw new QuestionError(
      'The provided id does not match any available question.',
    );

  const isQuestionAlreadyAnswered = doesQuestionExist.answered;

  if (isQuestionAlreadyAnswered)
    throw new QuestionError('This question has already been answered.');

  const updatedQuestion = await questionRepository.updateQuestion({
    answer,
    id,
    token,
  });

  return { updatedQuestion };
};

const retrieveUnansweredQuestions = async () => {
  const unansweredQuestions =
    await questionRepository.selectUnansweredQuestions();

  if (!unansweredQuestions.length)
    throw new QuestionError('There are no unanswered questions available.');

  return unansweredQuestions;
};

const retrieveQuestion = async (id: string) => {
  const doesQuestionExist = await questionRepository.findQuestionById(id);

  if (!doesQuestionExist)
    throw new QuestionError(
      'The provided id does not match any available question.',
    );

  const isQuestionAnswered = doesQuestionExist.answered;

  let questions = await questionRepository.selectUnansweredQuestion(id);

  if (isQuestionAnswered) {
    questions = await questionRepository.selectAnsweredQuestion(id);
  }

  const question = questions[0];
  question.tags = rearrangeTags(questions);

  return question;
};

export {
  createQuestion,
  createUser,
  createAnswer,
  retrieveUnansweredQuestions,
  retrieveQuestion,
};
