import ConfigType, { MailConfigType, ApiConfigType, DatabaseConfigType } from 'types/config';

const databaseConfig: DatabaseConfigType = {
  mongooseUri: String(process.env.MONGOOSE_URI),
};

const mailConfig: MailConfigType = {
  publicMailApikey: String(process.env.MJ_APIKEY_PUBLIC),
  privateMailApikey: String(process.env.MJ_APIKEY_PRIVATE),
};

const apiConfig: ApiConfigType = {
  version: String(process.env.API_VERSION),
};

const isDev: boolean = String(process.env.NODE_ENV) === 'development';

const config: ConfigType = {
  port: Number(String(process.env.PORT)),
  srcPath: isDev ? 'src' : 'dist',
  apiKeyPath: `${process.cwd()}/.keys`,
  isDev,
  logDir: `${process.cwd()}/logs`,
  database: databaseConfig,
  api: apiConfig,
  mail: mailConfig,
};

export default config;
