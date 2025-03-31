import Joi from 'joi';
import { stringRegexp } from '../constants/constants.js';

export const blogSchema = Joi.object({
  title: Joi.string().pattern(stringRegexp).min(3).max(20).required().messages({
    'string.min': 'title should have at least {#limit} characters',
    'string.max': 'title should have at most {#limit} characters',
    'any.required': 'title is required',
  }),
  header: Joi.string().pattern(stringRegexp).min(3).max(150).required().messages({
    'string.min': 'header should have at least {#limit} characters',
    'string.max': 'header should have at most {#limit} characters',
    'any.required': 'header is required',
  }),
  text: Joi.string().pattern(stringRegexp).min(3).max(1500).required().messages({
    'string.min': 'text should have at least {#limit} characters',
    'string.max': 'text should have at most {#limit} characters',
    'any.required': 'text is required',
  }),
  date: Joi.string().required().messages({
    'string.min': 'text should have at least {#limit} characters',
    'string.max': 'text should have at most {#limit} characters',
    'any.required': 'text is required',
  }),
});
