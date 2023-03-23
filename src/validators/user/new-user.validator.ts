import * as Joi from 'joi';

import { RegExpEnum } from '../../constants';

export const newUserValidator = Joi.object({
  email: Joi.string().trim().regex(RegExpEnum.email).required(),
  login: Joi.string().trim().min(3).max(50).required(),
  password: Joi.string().trim().regex(RegExpEnum.password).required(),
  phone: Joi.string().regex(RegExpEnum.phone).trim(),
  photo: Joi.string()
});
