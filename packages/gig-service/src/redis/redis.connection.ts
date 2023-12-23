import { winstonLogger } from '@base/logger';
import { config } from '@gig/config';
import { Logger } from 'winston';
import { createClient } from 'redis';

type RedisClient = ReturnType<typeof createClient>;

const log: Logger = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  'gigRedisConnection',
  'debug',
);

const client: RedisClient = createClient({ url: `${config.REDIS_HOST}` });

const redisConnect = async (): Promise<void> => {
  try {
    await client.connect();
    log.info(`GigService Redis Connection: ${await client.ping()}`);
    cacheError();
  } catch (error) {
    log.log('error', 'GigService redisConnect() method: ', error);
  }
};

const cacheError = (): void => {
  client.on('error', (error: unknown) => {
    log.error(error);
  });
};

export { redisConnect, client };
