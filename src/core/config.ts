import ConfigType, { MailConfigType, ApiConfigType, DatabaseConfigType, ServerConfigType } from 'types/config';

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

const server: ServerConfigType = {
  methods: String(process.env.CORS_METHODS),
  origin: String(process.env.CORS_ORIGIN).split(','),
};

const config: ConfigType = {
  port: Number(String(process.env.PORT)),
  srcPath: isDev ? 'src' : 'dist',
  apiKeyPath: `${process.cwd()}/.keys`,
  isDev,
  logDir: `${process.cwd()}/logs`,
  database: databaseConfig,
  api: apiConfig,
  mail: mailConfig,
  apiKeyEnable: String(process.env.API_KEY) !== '0',
  server,
};

export default config;
