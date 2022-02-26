import { Express } from 'express';
import glob from 'glob';

import config from '@core/config';

const {
  isDev,
  srcPath,
} = config;

const loadProject = (app: Express) => {
  const match = isDev ? `${srcPath}/services/**/routes/*.ts` : `${srcPath}/services/**/routes/*.js`;
  const routes = glob.sync(match);

  /* eslint-disable import/no-dynamic-require, global-require */
  routes.forEach((route) => require(`../../../${route}`).default(app));
  /* eslint-enable import/no-dynamic-require, global-require */
};

export default async (app: Express) => {
  loadProject(app);

  return app;
};
