import dotenv from 'dotenv-flow';

import Joi, { STRING_REQUIRED, OBJECT, STRING } from '@services/internal/helpers/joi';

dotenv.config();

const envSchema = OBJECT
  .keys({
    // GLOBAL
    PORT: STRING_REQUIRED,
    NODE_ENV: STRING_REQUIRED,
    API_VERSION: STRING_REQUIRED,
    // EMAIL
    MJ_APIKEY_PUBLIC: STRING,
    MJ_APIKEY_PRIVATE: STRING,
    // DATABASE
    MONGOOSE_URI: STRING_REQUIRED,
    // API KEY
    API_KEY: STRING,
  })
  .unknown();

try {
  Joi.attempt(process.env, envSchema);
} catch (e) {
  throw new Error(e.message);
}
