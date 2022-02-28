import { ApiPartnerType } from '@services/internal/infrastructure/file/apikey';
import { Notification } from '@services/notifications/models';

/* eslint-disable */
declare global {
  namespace Express {
    interface Request {
      // @TODO : Add override of express request
      partner: ApiPartnerType;
      notifications: Notification[];
      notification: Notification;
    }
  }
}
/* eslint-enable */
