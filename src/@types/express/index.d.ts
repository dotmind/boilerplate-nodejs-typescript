import { Notification } from '@services/notifications/models';

/* eslint-disable */
declare global {
  namespace Express {
    interface Request {
      notifications: Notification[];
      notification: Notification;
    }
  }
}
/* eslint-enable */
