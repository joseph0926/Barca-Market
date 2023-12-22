import { winstonLogger } from '@base/logger';
import { Logger } from 'winston';
import { config } from '@user/config';
import mongoose from 'mongoose';

const log: Logger = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  'userDBServer',
  'debug',
);

const dbConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(`${config.DATABASE_URL}`);
    log.info('User Service successfully connected to db');
  } catch (error) {
    log.log('error', 'UserService dbConnection() method: ', error);
  }
};

export { dbConnection };
