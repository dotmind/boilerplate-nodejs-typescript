import config from '@core/config';
import { NOTIFICATION_TAG } from '@services/open-api/constants';
import notificationEndpoints from '@services/notifications/doc/endpoints';
import { Notification } from '@services/notifications/doc/schemas';

const getServers = () => {
  // @TODO : Put here preprod - production env
  const sources = [
    {
      url: 'https://preprod',
      description: 'Preproduction',
    },
    {
      url: 'https://production',
      description: 'Production',
    },
  ];

  if (config.isDev) {
    return [{
      url: `http://localhost:${config.port}/api/v1`,
      description: 'Local',
    }, ...sources];
  }

  return sources;
};

const openAPI = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Open Api',
    description: 'Open Api',
    // @TODO : Change email
    contact: { email: 'open@documentation.api' },
  },
  servers: getServers(),
  tags: [
    { name: NOTIFICATION_TAG },
  ],
  components: {
    securitySchemes: {
      // @TODO : Put here security auth
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'x-api-key',
      },
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      // @TODO : Add schema to documentation
      Notification,
    },
  },
  paths: {
    // @TODO : Add endpoints to documentation
    ...notificationEndpoints,
  },
};

export default openAPI;
