import { Express } from 'express';
import glob from 'glob';
import fs from 'fs';

import config from '@core/config';

const {
  isDev,
  logDir,
  srcPath,
  apiKeyPath,
} = config;

const loadProject = (app: Express) => {
  const prefix = `${process.cwd()}/${srcPath}/services/**/`;
  const suffix = isDev ? '*.ts' : '*.js';

  const routes = glob.sync(`${prefix}routes/${suffix}`);
  const models = glob.sync(`${prefix}models/${suffix}`);

  /* eslint-disable import/no-dynamic-require, global-require */
  routes.forEach((route) => require(route).default(app));
  models.forEach((model) => require(model));
  /* eslint-enable import/no-dynamic-require, global-require */
};

const createFolders = () => {
  try {
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    if (!fs.existsSync(apiKeyPath)) {
      fs.mkdirSync(apiKeyPath);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`[server error] On createLogsFolder : ${error.message}`);
  }
};

export default async (app: Express) => {
  loadProject(app);

  createFolders();

  return app;
};
