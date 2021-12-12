import joi from 'joi';

import { UserInput } from '../interfaces/user';

const userSchema = joi.object({
  name: joi.string().max(30).required(),
  className: joi.string().max(2).required(),
});

const isUserInputValid = ({ name, class: className }: UserInput) => {
  if (userSchema.validate({ name, className }).error) return false;
  return true;
};

export { isUserInputValid };
