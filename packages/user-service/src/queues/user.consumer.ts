import { winstonLogger } from '@base/logger';
import { config } from '@user/config';
import { Logger } from 'winston';
import { Channel, ConsumeMessage } from 'amqplib';
import { createConnection } from '@user/queues/connection';
import { IBuyerDocument } from '@base/interfaces/buyer.interface';
import {
  createBuyer,
  updateBuyerPurchasedGigsProp,
} from '@user/services/buyer.service';
import {
  getRandomSellers,
  updateSellerCancelledJobsProp,
  updateSellerCompletedJobsProp,
  updateSellerOngoingJobsProp,
  updateSellerReview,
  updateTotalGigsCount,
} from '@user/services/seller.service';
import { publishDirectMessage } from '@user/queues/user.producer';
import { ISellerDocument } from '@base/interfaces/seller.interface';

const log: Logger = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  'userServiceConsumer',
  'debug',
);

const cousumeBuyerDirectMessages = async (channel: Channel): Promise<void> => {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }

    const exchangeName = 'barca-buyer-update';
    const routingKey = 'user-buyer';
    const queueName = 'user-buyer-queue';
    await channel.assertExchange(exchangeName, 'direct');

    const barcaQueue = await channel.assertQueue(queueName, {
      durable: true,
      autoDelete: false,
    });
    await channel.bindQueue(barcaQueue.queue, exchangeName, routingKey);

    channel.consume(barcaQueue.queue, async (msg: ConsumeMessage | null) => {
      const { type } = JSON.parse(msg!.content.toString());
      if (type === 'auth') {
        const { username, email, profileImage, country, createdAt } =
          JSON.parse(msg!.content.toString());
        const buyer: IBuyerDocument = {
          username,
          email,
          profileImage,
          country,
          purchasedGigs: [],
          createdAt,
        };
        await createBuyer(buyer);
      } else {
        const { buyerId, purchasedGigs } = JSON.parse(msg!.content.toString());
        await updateBuyerPurchasedGigsProp(buyerId, purchasedGigs, type);
      }
      channel.ack(msg!);
    });
  } catch (error) {
    log.log(
      'error',
      'UserService cousumeBuyerDirectMessages() method: ',
      error,
    );
  }
};

const cousumeSellerDirectMessages = async (channel: Channel): Promise<void> => {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }

    const exchangeName = 'barca-seller-update';
    const routingKey = 'user-seller';
    const queueName = 'user-seller-queue';
    await channel.assertExchange(exchangeName, 'direct');

    const barcaQueue = await channel.assertQueue(queueName, {
      durable: true,
      autoDelete: false,
    });
    await channel.bindQueue(barcaQueue.queue, exchangeName, routingKey);

    channel.consume(barcaQueue.queue, async (msg: ConsumeMessage | null) => {
      const {
        type,
        sellerId,
        ongoingJobs,
        completedJobs,
        totalEarnings,
        recentDelivery,
        gigSellerId,
        count,
      } = JSON.parse(msg!.content.toString());
      if (type === 'create-order') {
        await updateSellerOngoingJobsProp(sellerId, ongoingJobs);
      } else if (type === 'approve-order') {
        await updateSellerCompletedJobsProp({
          sellerId,
          ongoingJobs,
          totalEarnings,
          completedJobs,
          recentDelivery,
        });
      } else if (type === 'update-gig-count') {
        await updateTotalGigsCount(`${gigSellerId}`, count);
      } else if (type === 'cancel-order') {
        await updateSellerCancelledJobsProp(sellerId);
      }
      channel.ack(msg!);
    });
  } catch (error) {
    log.log(
      'error',
      'UserService cousumeSellerDirectMessages() method: ',
      error,
    );
  }
};

const cousumeReviewFanoutMessages = async (channel: Channel): Promise<void> => {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }

    const exchangeName = 'barca-review';
    const queueName = 'seller-review-queue';
    await channel.assertExchange(exchangeName, 'fanout');

    const barcaQueue = await channel.assertQueue(queueName, {
      durable: true,
      autoDelete: false,
    });
    await channel.bindQueue(barcaQueue.queue, exchangeName, '');

    channel.consume(barcaQueue.queue, async (msg: ConsumeMessage | null) => {
      const { type } = JSON.parse(msg!.content.toString());
      if (type === 'buyer-review') {
        await updateSellerReview(JSON.parse(msg!.content.toString()));
        await publishDirectMessage(
          channel,
          'barca-update-gig',
          'update-gig',
          JSON.stringify({
            type: 'updateGig',
            gigReview: msg!.content.toString(),
          }),
          'Message sent to gig service',
        );
      }
      channel.ack(msg!);
    });
  } catch (error) {
    log.log(
      'error',
      'UserService cousumeReviewFanoutMessages() method: ',
      error,
    );
  }
};

const cousumeSeedDirectMessages = async (channel: Channel): Promise<void> => {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }

    const exchangeName = 'barca-gig';
    const routingKey = 'get-sellers';
    const queueName = 'user-gig-queue';
    await channel.assertExchange(exchangeName, 'direct');

    const barcaQueue = await channel.assertQueue(queueName, {
      durable: true,
      autoDelete: false,
    });
    await channel.bindQueue(barcaQueue.queue, exchangeName, routingKey);

    channel.consume(barcaQueue.queue, async (msg: ConsumeMessage | null) => {
      const { type } = JSON.parse(msg!.content.toString());
      if (type === 'getSellers') {
        const { count } = JSON.parse(msg!.content.toString());
        const sellers: ISellerDocument[] = await getRandomSellers(
          parseInt(count, 10),
        );
        await publishDirectMessage(
          channel,
          'barca-seed-gig',
          'receive-sellers',
          JSON.stringify({ type: 'receiveSellers', sellers, count }),
          'Message sent to gig service',
        );
      }
      channel.ack(msg!);
    });
  } catch (error) {
    log.log('error', 'UserService cousumeSeedDirectMessages() method: ', error);
  }
};

export {
  cousumeBuyerDirectMessages,
  cousumeSellerDirectMessages,
  cousumeReviewFanoutMessages,
  cousumeSeedDirectMessages,
};
