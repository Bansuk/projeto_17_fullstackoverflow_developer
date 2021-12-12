import { QuestionInput } from '../interfaces/question';
import QuestionError from '../errors/QuestionError';
import * as questionRepository from '../repositories/questionRepository';

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

export { createQuestion };
