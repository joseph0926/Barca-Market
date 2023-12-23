import client, { Channel, Connection } from 'amqplib';
import { Logger } from 'winston';
import { winstonLogger } from '@base/logger';
import { config } from '@gig/config';

const log: Logger = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  'gigQueueConnection',
  'debug',
);

const createConnection = async (): Promise<Channel | undefined> => {
  try {
    const connection: Connection = await client.connect(
      `${config.RABBITMQ_ENDPOINT}`,
    );
    const channel: Channel = await connection.createChannel();

    log.info('Gig server connected to queue successfully,,,');

    closeConnection(channel, connection);
    return channel;
  } catch (error) {
    log.log('error', 'GigService createConnection() method: ', error);
    return undefined;
  }
};

const closeConnection = (channel: Channel, connection: Connection): void => {
  process.once('SIGINT', async () => {
    await channel.close();
    await connection.close();
  });
};

export { createConnection };
