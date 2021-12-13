import joi from 'joi';

const answerSchema = joi.object({
  answer: joi.string().required(),
});

const isAnswerInputValid = (answer: { answer: string }) => {
  if (answerSchema.validate(answer).error) return false;
  return true;
};

export { isAnswerInputValid };
