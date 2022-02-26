import ConfigType, { MailConfigType, ApiConfigType } from 'types/config';

const mailConfig: MailConfigType = {
  publicMailApikey: String(process.env.MJ_APIKEY_PUBLIC),
  privateMailApikey: String(process.env.MJ_APIKEY_PRIVATE),
};

const apiConfig: ApiConfigType = {
  version: String(process.env.API_VERSION),
};

const config: ConfigType = {
  port: Number(String(process.env.PORT)),
  srcPath: String(process.env.ROOT_PATH),
  isDev: String(process.env.NODE_ENV) === 'development',
  logDir: String(process.env.LOG_DIR),
  api: apiConfig,
  mail: mailConfig,
};

export default config;
