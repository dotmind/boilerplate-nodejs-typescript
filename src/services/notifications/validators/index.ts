import { STRING, STRING_REQUIRED } from '@services/internal/helpers/joi';

export const notificationBody = {
  message: STRING_REQUIRED,
};

export const notificationQuery = {
  message: STRING.allow(null).allow(''),
};
