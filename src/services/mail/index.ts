import mailService from '@services/internal/infrastructure/mail';
import { EmailJobType } from '@services/mail/types';

export const formatJobToRequest = ({
  to,
  from,
  subject,
  text,
  html,
}: EmailJobType) => ({
  Messages: [{
    From: {
      Email: from.mail,
      Name: from.name,
    },
    To: [{
      Email: to.mail,
      Name: to.name,
    }],
    Subject: subject,
    TextPart: text,
    HTMLPart: html,
  }],
});

export const send = async (job: EmailJobType) => {
  const request = formatJobToRequest(job);

  try {
    return mailService
      .post('send', { version: 'v3.1' })
      .request(request);
  } catch (e) {
    return true;
  }
};
