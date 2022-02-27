import { Request, Response } from 'express';

import api from '@services/internal/infrastructure/api';

export const getAll = async (req: Request, res: Response) => {
  const { notifications } = req;

  return api.success(res, 200)({ notifications: notifications || [] });
};

export const create = async (req: Request, res: Response) => {
  const { notification } = req;

  return api.success(res, 201)({ notification });
};
