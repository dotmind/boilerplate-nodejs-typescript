import { NextFunction, Request, Response } from 'express';

import config from '@core/config';
import ERROR_CODES from '@services/internal/constants/error-codes';
import api from '@services/internal/infrastructure/api';
import { apiKeyLogger } from '@services/internal/infrastructure/logger';
import ApiKeyManager from '@services/internal/infrastructure/file/apikey';

const checkApiKey = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const xApiKey = req.get('x-api-key');

    req.partner = await ApiKeyManager.read(xApiKey);

    const blackListRegex = new RegExp(`^${req.partner.blacklist.join('$|^')}$`.replace(/\//g, '\\/'), 'i');

    if (blackListRegex.test(`${req.method}:${req.url.replace(/\/$/, '')}`)) {
      throw new Error(ERROR_CODES.GLOBAL.NOT_FOUND);
    }

    if (!config.isDev) {
      const {
        partner: { name: partner },
        originalUrl: endpoint,
      } = req;

      apiKeyLogger.info(`key : ${xApiKey} - partner : ${partner} - endpoint : ${endpoint}`);
    }

    return next();
  } catch (err) {
    if (err.message === ERROR_CODES.GLOBAL.NOT_FOUND) {
      return api.error(res, 404)({ message: err.message });
    }

    return api.error(res, 401)({ message: ERROR_CODES.API_KEY.INVALID });
  }
};

export default checkApiKey;
