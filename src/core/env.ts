import dotenv from 'dotenv';

import Joi, { STRING_REQUIRED, OBJECT } from '@services/internal/helpers/joi';

dotenv.config();

const envSchema = OBJECT
  .keys({
    // GLOBAL
    PORT: STRING_REQUIRED,
    NODE_ENV: STRING_REQUIRED,
    ROOT_PATH: STRING_REQUIRED,
  })
  .unknown();

export default () => {
  try {
    Joi.attempt(process.env, envSchema);
  } catch (e) {
    throw new Error(e.message);
  }
};
