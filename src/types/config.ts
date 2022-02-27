export type DatabaseConfigType = {
  mongooseUri: string;
};

export type ApiConfigType = {
  version: string;
};

export type MailConfigType = {
  publicMailApikey: string;
  privateMailApikey: string;
};

type ConfigType = {
  port: number;
  srcPath: string;
  isDev: boolean;
  logDir: string;
  database: DatabaseConfigType;
  api: ApiConfigType,
  mail: MailConfigType;
};

export default ConfigType;
