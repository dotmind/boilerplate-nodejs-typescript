/* eslint-disable no-console */

const newLine = () => console.log('\n');
const exit = (code = 0) => process.exit(code);
const logger = console.log;

export {
  newLine,
  exit,
  logger,
};

/* eslint-enable no-console */
