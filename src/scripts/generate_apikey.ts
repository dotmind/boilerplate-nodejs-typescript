import inquirer from 'inquirer';
import chalk from 'chalk';

import { newLine, exit, logger } from 'scripts/utils/utils_cli';
import ApiKeyManager from '@services/internal/infrastructure/file/apikey';

const ACTIONS = {
  CREATE: 'Create',
  LIST: 'List',
  CANCEL: 'Cancel',
};

const selectActions = async () => inquirer.prompt([{
  name: 'action',
  type: 'list',
  message: 'Select action 👀 ',
  choices: Object.values(ACTIONS),
}]);

/* Create a key */
const createPartner = async () => inquirer.prompt([{
  name: 'partner',
  type: 'input',
  message: 'Enter partner name 🤝 ',
}]);

/* Add a blacklisted endpoint */
const addBlacklistedEndpoint = async () => inquirer.prompt([{
  name: 'endpoint',
  type: 'input',
  message: 'Enter blacklisted endpoint regex 🛑 ',
}]);

/* List keys */
const listKeys = async () => inquirer.prompt([{
  name: 'key',
  type: 'list',
  message: 'All keys availables 🤓 ',
  choices: [...await ApiKeyManager.scan(), ACTIONS.CANCEL],
}]);

const handleCreate = async () => {
  const { partner } = await createPartner();
  if (!partner || partner.length === 0) {
    logger(chalk.bold.red('Partner name invalid 🛑'));
    exit(1);
  }

  const name = partner.toLowerCase();

  const blacklist = [];

  for (
    let result = await addBlacklistedEndpoint();
    result && result.endpoint;
    result = await addBlacklistedEndpoint() // eslint-disable-line no-await-in-loop
  ) {
    const { endpoint } = result;

    if (!blacklist.includes(endpoint) && endpoint) {
      blacklist.push(endpoint);
    }
  }

  const { key, file } = await ApiKeyManager.create();

  await ApiKeyManager.write(key, {
    name,
    blacklist,
    _version: 1,
    _created: Date.now(),
  });

  newLine();
  logger(chalk.green('New api key created 🎉'));
  logger(`Partner: ${name}`);
  logger(`Key: ${key}`);
  logger(`Endpoints blacklisted: ${blacklist}`);
  logger(`File: ${file}`);
  newLine();

  return run();
};

const handleList = async () => {
  const LIST_ACTIONS = {
    DELETE: 'Delete',
    CANCEL: ACTIONS.CANCEL,
  };

  const { key } = await listKeys();
  if (key === LIST_ACTIONS.CANCEL) {
    return run();
  }

  const partner = await ApiKeyManager.read(key, { strict: false });

  newLine();
  Object.keys(partner).forEach((i) => {
    const text = i === '_created'
      ? `${i}: ${partner[i]} - ${new Date(partner[i]).toString()}`
      : `${i}: ${partner[i]}`;

    logger(chalk.cyan(text));
  });
  newLine();

  const { action } = await inquirer.prompt([{
    name: 'action',
    type: 'list',
    message: `Partner: ${partner.name} 👋 `,
    choices: Object.values(LIST_ACTIONS),
  }]);

  if (action === LIST_ACTIONS.DELETE) {
    const { ok } = await inquirer.prompt({
      type: 'confirm',
      name: 'ok',
      message: chalk.yellow(`Delete '${key}'? 😬 `),
    });

    if (ok) {
      await ApiKeyManager.remove(key);
      logger(chalk.green('Api key deleted 💀'));
      newLine();
    }
  }

  return run();
};

const run = async () => {
  const { action } = await selectActions();

  switch (action) {
    case ACTIONS.CREATE:
      return handleCreate();
    case ACTIONS.LIST:
      return handleList();
    case ACTIONS.CANCEL:
    default:
      exit();
  }
};

run();
