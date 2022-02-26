import { Express } from 'express';

import middlewares from '@core/loaders/middlewares';
import project from '@core/loaders/project';

export default async (app: Express) => {
  middlewares(app);
  project(app);

  return app;
};
