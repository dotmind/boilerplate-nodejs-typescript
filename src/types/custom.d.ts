import { NotificationType } from 'types/notification';

/* eslint-disable */
declare global {
  namespace Express {
    interface Request {
      notifications: NotificationType[];
    }
  }
}
/* eslint-enable */
