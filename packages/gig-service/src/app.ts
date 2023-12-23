import { dbConnection } from '@gig/db';
import { config } from '@gig/config';
import express, { Express } from 'express';
import { start } from '@gig/server';

const initialize = (): void => {
  config.cloudinaryConfig();
  dbConnection();

  const app: Express = express();
  start(app);
};
initialize();
