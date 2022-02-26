import { Express } from 'express';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import config from '@core/config';

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

  return app;
};
