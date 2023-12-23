import { Logger } from 'winston';
import { winstonLogger } from '@base/logger';
import { config } from '@user/config';
import { Channel } from 'amqplib';
import { createConnection } from '@user/queues/connection';

const log: Logger = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  'userQueueProducer',
  'debug',
);

const publishDirectMessage = async (
  channel: Channel,
  exchangeName: string,
  routingKey: string,
  message: string,
  logMessage: string,
): Promise<void> => {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }
    await channel.assertExchange(exchangeName, 'direct');
    channel.publish(exchangeName, routingKey, Buffer.from(message));
    log.info(logMessage);
  } catch (error) {
    log.log('error', 'UserService publishDirectMessage() method: ', error);
  }
};

export { publishDirectMessage };
