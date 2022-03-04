import { ApiPartnerType } from '@services/internal/infrastructure/file/apikey';
import { Notification } from '@services/notifications/models';
// IMPORT_GENERATED
// END_GENERATED

/* eslint-disable */
declare global {
  namespace Express {
    interface Request {
      partner: ApiPartnerType;
      notifications: Notification[];
      notification: Notification;

      // ADD_GENERATED_TYPE
      // END_GENERATED
    }
  }
}
/* eslint-enable */
