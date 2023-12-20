import 'express-async-errors';
import http from 'http';
import { Logger } from 'winston';
import { Application } from 'express';
import { Channel } from 'amqplib';
import { winstonLogger } from '@base/logger';
import { IEmailMessageDetails } from '@base/interfaces/auth.interface';
import { config } from '@notification/config';
import { healthRoutes } from '@notification/routes';
import { checkConnection } from '@notification/elasticsearch';
import { createConnection } from '@notification/queues/connections';
import {
  consumeAuthEmailMessages,
  consumeOrderEmailMessages,
} from '@notification/queues/email.consumer';

const SERVER_PORT = 4001;
const log: Logger = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  'notificationServer',
  'debug',
);

export const start = (app: Application): void => {
  startServer(app);

  app.use('', healthRoutes);

  startQueues();
  startElasticSearch();
};

const startQueues = async (): Promise<void> => {
  const emailChannel: Channel = (await createConnection()) as Channel;
  await consumeAuthEmailMessages(emailChannel);
  await consumeOrderEmailMessages(emailChannel);

  const verificationLink = `${config.CLIENT_URL}/confirm_email?v_token=asdkjaskdals`;
  const messageDetails: IEmailMessageDetails = {
    receiverEmail: `${config.SENDER_EMAIL}`,
    verifyLink: verificationLink,
    template: 'verifyEmail',
  };

  await emailChannel.assertExchange('barca-email-notification', 'direct');
  const message = JSON.stringify(messageDetails);
  emailChannel.publish(
    'barca-email-notification',
    'auth-email',
    Buffer.from(message),
  );
  // await emailChannel.assertExchange('barca-order-notification', 'direct');
};

const startElasticSearch = (): void => {
  checkConnection();
};

const startServer = (app: Application): void => {
  try {
    const httpServer: http.Server = new http.Server(app);
    log.info(
      `Worker with process id of ${process.pid} on notification server has started`,
    );
    httpServer.listen(SERVER_PORT, () => {
      log.info(`Notification Server running on port ${SERVER_PORT}`);
    });
  } catch (error) {
    log.log('error', 'NotificationService startServer() method', error);
  }
};
