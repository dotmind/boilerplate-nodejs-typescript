import ConfigType from 'types/config';

const config: ConfigType = {
  port: Number(String(process.env.PORT)),
  srcPath: String(process.env.ROOT_PATH),
  isDev: String(process.env.NODE_ENV) === 'development',
};

export default config;
