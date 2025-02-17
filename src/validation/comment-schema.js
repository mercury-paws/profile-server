import Joi from 'joi';
import { emailRegexp } from '../constants/constants.js';

export const commentAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.pattern.base':
      'Email should be of the following format: name@example.com',
    'any.required': 'Email is required',
  }),
  comment: Joi.string().min(3).max(20).required(),
});
