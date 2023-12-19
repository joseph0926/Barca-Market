import 'express-async-errors';
import http from 'http';
import { Logger } from 'winston';
import { Application } from 'express';
import { winstonLogger } from '@base/logger';
import { config } from '@notification/config';
import { healthRoutes } from '@notification/routes';
import { checkConnection } from '@notification/elasticsearch';

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

const startQueues = async (): Promise<void> => {};

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
