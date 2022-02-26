export type EmailContactType = {
  mail: string;
  name: string;
};

export type EmailJobType = {
  to: EmailContactType;
  from: EmailContactType;
  subject: string;
  text: string;
  html: string;
};
