import { TYPES } from '@services/open-api/constants';

export const Notification = {
  type: 'object',
  properties: {
    id: { ...TYPES.STRING, example: '5eaaf43f7b71950e61f228e2' },
    message: { ...TYPES.STRING, example: 'Mon message' },
    date: { ...TYPES.STRING, example: '2020-04-24T11:00:00.000Z' },
  },
};
