import mailjet from 'node-mailjet';

import config from '@core/config';

const { mail: { privateMailApikey, publicMailApikey } } = config;

export default mailjet.connect(publicMailApikey, privateMailApikey);
