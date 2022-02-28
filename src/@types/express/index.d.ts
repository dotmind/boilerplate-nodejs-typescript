import { Notification } from '@services/notifications/models';

/* eslint-disable */
declare global {
  namespace Express {
    interface Request {
      // @TODO : Add override of express request
      notifications: Notification[];
      notification: Notification;
    }
  }
}
/* eslint-enable */
