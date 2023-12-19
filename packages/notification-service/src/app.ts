import { Logger } from 'winston';
import { winstonLogger } from '@base/logger';
import { config } from '@notification/config';
import express, { Express } from 'express';
import { start } from '@notification/server';

const log: Logger = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  'notificationApp',
  'debug',
);

const initialize = (): void => {
  const app: Express = express();
  start(app);

  log.info('Notification Server Initialized');
};
initialize();
