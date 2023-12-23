import { dbConnection } from '@gig/db';
import { config } from '@gig/config';
import express, { Express } from 'express';
import { start } from '@gig/server';
import { redisConnect } from '@gig/redis/redis.connection';

const initialize = (): void => {
  config.cloudinaryConfig();
  dbConnection();

  const app: Express = express();
  start(app);

  redisConnect();
};
initialize();
