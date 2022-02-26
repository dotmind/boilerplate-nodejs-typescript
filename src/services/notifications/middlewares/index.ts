import { NextFunction, Request, Response } from 'express';

import api from '@services/internal/infrastructure/api';
import { logger } from '@services/internal/infrastructure/logger';

export const retrievedNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    req.notifications = [];

    // @Example : To send mail
    // global.EmailQueue.addEmailToQueue(data);

    return next();
  } catch (error) {
    logger.error('Middleware "retrievedNotifications" : ', error.message);

    return api.error(res, 500)({ message: error.message });
  }
};

export default retrievedNotifications;
