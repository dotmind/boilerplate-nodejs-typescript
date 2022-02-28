import EmailQueue from '@services/mail/queues';

declare module 'logplease';

/* eslint-disable */
declare global {
  var EmailQueue: EmailQueue;
}
/* eslint-enable */
