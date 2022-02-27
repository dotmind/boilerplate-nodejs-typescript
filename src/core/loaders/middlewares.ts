import { Express } from 'express';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';

import config from '@core/config';
import openAPI from '@services/open-api';

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

  app.use(
    '/doc',
    swaggerUI.serve,
    swaggerUI.setup(openAPI),
  );

  return app;
};
