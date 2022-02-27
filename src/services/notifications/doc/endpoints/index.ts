import {
  API_KEY,
  json,
  apiResponseFromRef,
  apiResponseArray,
} from '@services/open-api/helpers';
import { NOTIFICATION_TAG, TYPES } from '@services/open-api/constants';

const create = {
  tags: [NOTIFICATION_TAG],
  description: 'Create a notification',
  operationId: 'createNotification',
  security: [API_KEY],
  requestBody: json({
    schema: {
      type: 'object',
      properties: {
        message: {
          ...TYPES.STRING,
          required: true,
        },
      },
    },
  }),
  responses: { 200: apiResponseFromRef('#/components/schemas/Notification') },
};

const getAll = {
  tags: [NOTIFICATION_TAG],
  description: 'Get notifications',
  operationId: 'getNotifications',
  security: [API_KEY],
  responses: { 200: apiResponseArray({ $ref: '#/components/schemas/Notification' }) },
};

export default {
  '/notification': {
    get: getAll,
    post: create,
  },
};
