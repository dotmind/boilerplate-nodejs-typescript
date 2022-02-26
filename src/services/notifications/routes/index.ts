import express, { Application } from 'express';

import api from '@services/internal/infrastructure/api';

import { retrievedNotifications } from '@services/notifications/middlewares';
import getNotifications from '@services/notifications/controllers';

const router = express.Router();

export default (app: Application) => {
  app.use(api.scope('notification'), router);

  router.get(
    '/',
    retrievedNotifications,
    api.controller(getNotifications),
  );
};
