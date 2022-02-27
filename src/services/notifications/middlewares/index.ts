import { NextFunction, Request, Response } from 'express';

import api from '@services/internal/infrastructure/api';
import { logger } from '@services/internal/infrastructure/logger';
import Notification from '@services/notifications/models';

export const getNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    req.notifications = await Notification.find() || [];

    // @Example : To send mail
    // global.EmailQueue.addEmailToQueue(data);

    return next();
  } catch (error) {
    logger.error('Middleware "retrievedNotifications" : ', error.message);

    return api.error(res, 500)({ message: error.message });
  }
};

export const createNotification = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { body } = req;

    const notification = new Notification({ ...body, date: Date.now() });
    await notification.save();

    req.notification = notification;

    return next();
  } catch (error) {
    logger.error('Middleware "createNotification" : ', error.message);

    return api.error(res, 500)({ message: error.message });
  }
};
