import { Express } from 'express';

import loadMiddlewares from '@core/loaders/middlewares';
import loadProject from '@core/loaders/project';
import loadQueue from '@core/loaders/queue';
import loadDatabase from '@core/loaders/database';
import error from '@services/internal/middlewares/error';
import notFound from '@services/internal/middlewares/notFound';

export default async (app: Express) => {
  loadMiddlewares(app);
  await loadDatabase();
  loadProject(app);
  loadQueue();

  app.use(error);
  app.use(notFound);

  return app;
};
