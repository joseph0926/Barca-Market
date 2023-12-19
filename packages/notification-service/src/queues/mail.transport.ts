import { Logger } from 'winston';
import { winstonLogger } from '@base/logger';
import { config } from '@notification/config';
import { IEmailLocals } from '@base/interfaces/email.interface';
import { emailTemplates } from '@notification/helpers';

const log: Logger = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  'mailTransport',
  'debug',
);

const sendEmail = async (
  template: string,
  receiverEmail: string,
  locals: IEmailLocals,
): Promise<void> => {
  try {
    emailTemplates(template, receiverEmail, locals);
    log.info('Email sent successfully');
  } catch (error) {
    log.log(
      'error',
      'NotificationService MailTransport sendEmail() method: ',
      error,
    );
  }
};

export { sendEmail };
