import { Express } from 'express';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';

import config from '@core/config';
import openAPI from '@services/open-api';
import checkApiKey from '@services/internal/middlewares/apikey';

export default async (app: Express) => {
  app.use(cors());
  app.use(compression());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  if (config.isDev) {
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
  app.use(checkApiKey);

  return app;
};
