import { Express } from 'express';
import cors from 'cors';

import config from '@core/config';

const {
  isDev,
  server: { origin, methods }
} = config;

export default (app: Express) => {
  if (isDev || (!origin && !methods)) {
    app.use(cors());
  }

  app.use(cors({
    credentials: true,
    origin,
    methods,
  }));
}
