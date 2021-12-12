import joi from 'joi';

import { QuestionInput } from '../interfaces/question';

const questionSchema = joi.object({
  question: joi.string().required(),
  student: joi.string().max(30).required(),
  className: joi.string().max(2).required(),
  tags: joi.string().required(),
});

const isQuestionInputValid = ({
  question,
  student,
  class: className,
  tags,
}: QuestionInput) => {
  if (questionSchema.validate({ question, student, className, tags }).error)
    return false;
  return true;
};

export { isQuestionInputValid };
