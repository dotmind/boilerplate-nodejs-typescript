import Queue, { Job } from 'bull';

import { mailLogger } from '@services/internal/infrastructure/logger';
import { MAIL_QUEUE } from '@services/mail/constants';
import { send } from '@services/mail';
import { EmailJobType } from '@services/mail/types';

class EmailQueue {
  queue: Queue.Queue<EmailJobType>;

  constructor() {
    this.queue = new Queue<EmailJobType>(MAIL_QUEUE);

    this.queue.process('email', (job) => {
      this.sendMail(job);
    });
  }

  addEmailToQueue(data: EmailJobType) {
    this.queue.add('email', data);
  }

  async sendMail(job: Job<EmailJobType>) {
    const {
      to, from, subject, text, html,
    } = job.data;

    const message = {
      to,
      from,
      subject,
      text,
      html,
    };

    try {
      mailLogger.info(`Email '${subject}' to '${to.mail}:${to.name}'`, JSON.stringify(job.data));

      await send(message);
      job.moveToCompleted('done', true);
    } catch (error) {
      mailLogger.error(`Email '${subject}' to '${to.mail}:${to.name}'`, JSON.stringify(job.data));

      job.moveToFailed({ message: 'job failed' });
    }
  }
}

export default EmailQueue;
