import fs from 'fs';

import config from '@core/config';

const { logDir, apiKeyPath } = config;

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

export default () => {
  createFolders();
}
