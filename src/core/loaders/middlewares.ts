import { Express } from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';

import config from '@core/config';
import openAPI from '@services/open-api';
import checkApiKey from '@services/internal/middlewares/apikey';
import cors from '@services/internal/middlewares/cors';

const {
  isDev,
  apiKeyEnable,
} = config;

export default async (app: Express) => {
  app.disable('x-powered-by');

  cors(app);

  app.use(compression());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  if (isDev) {
    app.use(morgan('combined'));
  } else {
    app.use(morgan('tiny'));
  }

  // Api Documentation UI
  app.use(
    '/doc',
    swaggerUI.serve,
    swaggerUI.setup(openAPI),
  );

  // Api key firewall
  if (apiKeyEnable) {
    app.use(checkApiKey);
  }

  return app;
};
