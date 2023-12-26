import { Channel, ConsumeMessage, Replies } from 'amqplib';
import { Logger } from 'winston';
import { createConnection } from '@order/queues/connection';
import { config } from '@order/config';
import { winstonLogger } from '@base/logger';
import { updateOrderReview } from '@order/services/order.service';

const log: Logger = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  'orderServiceConsumer',
  'debug',
);

export const consumerReviewFanoutMessages = async (
  channel: Channel,
): Promise<void> => {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }
    const exchangeName = 'barca-review';
    const queueName = 'order-review-queue';
    await channel.assertExchange(exchangeName, 'fanout');
    const barcaQueue: Replies.AssertQueue = await channel.assertQueue(
      queueName,
      { durable: true, autoDelete: false },
    );
    await channel.bindQueue(barcaQueue.queue, exchangeName, '');
    channel.consume(barcaQueue.queue, async (msg: ConsumeMessage | null) => {
      await updateOrderReview(JSON.parse(msg!.content.toString()));
      channel.ack(msg!);
    });
  } catch (error) {
    log.log(
      'error',
      'OrderService comsumer consumerReviewFanoutMessages() method:',
      error,
    );
  }
};
