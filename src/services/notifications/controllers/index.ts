import { Request, Response } from 'express';

import api from '@services/internal/infrastructure/api';

const getNotifications = async (req: Request, res: Response) => {
  const { notifications } = req;

  return api.success(res, 200)({ notifications: notifications || [] });
};

export default getNotifications;
