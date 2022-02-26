import EmailQueue from '@services/mail/queues';

export default async () => {
  global.EmailQueue = new EmailQueue();
};
