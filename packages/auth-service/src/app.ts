import express, { Express } from 'express';
import { start } from '@auth/server';
import { config } from '@auth/config';

const initialize = (): void => {
  config.cloudinaryConfig();

  const app: Express = express();
  start(app);
};
initialize();
