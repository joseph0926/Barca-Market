import { dbConnection } from '@user/db';
import { config } from '@user/config';
import express, { Express } from 'express';
import { start } from '@user/server';

const initialize = (): void => {
  config.cloudinaryConfig();
  dbConnection();

  const app: Express = express();
  start(app);
};
initialize();
