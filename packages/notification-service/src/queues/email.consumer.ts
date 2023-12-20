import { Channel, ConsumeMessage } from 'amqplib';
import { Logger } from 'winston';
import { winstonLogger } from '@base/logger';
import { config } from '@notification/config';
import { createConnection } from '@notification/queues/connections';
import { IEmailLocals } from '@base/interfaces/email.interface';
import { sendEmail } from '@notification/queues/mail.transport';

const log: Logger = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  'emailConsumer',
  'debug',
);

const consumeAuthEmailMessages = async (channel: Channel): Promise<void> => {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }
    const exchangeName = 'barca-email-notification';
    const routingKey = 'auth-email';
    const queueName = 'auth-email-queue';

    await channel.assertExchange(exchangeName, 'direct');

    const barcaQueue = await channel.assertQueue(queueName, {
      durable: true,
      autoDelete: false,
    });

    await channel.bindQueue(barcaQueue.queue, exchangeName, routingKey);

    channel.consume(barcaQueue.queue, async (msg: ConsumeMessage | null) => {
      const { receiverEmail, username, verifyLink, resetLink, template } =
        JSON.parse(msg!.content.toString());
      const locals: IEmailLocals = {
        appLink: `${config.CLIENT_URL}`,
        appIcon: 'https://i.ibb.co/WDJ3ztB/barca-logo.png',
        username,
        verifyLink,
        resetLink,
      };
      await sendEmail(template, receiverEmail, locals);

      channel.ack(msg!);
    });
  } catch (error) {
    log.log(
      'error',
      'NotificationService EmailConsumer consumeAuthEmailMessages() method: ',
      error,
    );
  }
};

const consumeOrderEmailMessages = async (channel: Channel): Promise<void> => {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }
    const exchangeName = 'barca-order-notification';
    const routingKey = 'order-email';
    const queueName = 'order-email-queue';

    await channel.assertExchange(exchangeName, 'direct');

    const barcaQueue = await channel.assertQueue(queueName, {
      durable: true,
      autoDelete: false,
    });

    await channel.bindQueue(barcaQueue.queue, exchangeName, routingKey);

    channel.consume(barcaQueue.queue, async (msg: ConsumeMessage | null) => {
      const {
        title,
        offerLink,
        amount,
        buyerUsername,
        sellerUsername,
        description,
        deliveryDays,
        orderId,
        orderDue,
        requirements,
        orderUrl,
        originalDate,
        newDate,
        reason,
        subject,
        header,
        type,
        message,
        serviceFee,
        total,
        receiverEmail,
        username,
        template,
        sender,
      } = JSON.parse(msg!.content.toString());

      const locals: IEmailLocals = {
        appLink: `${config.CLIENT_URL}`,
        appIcon: 'https://i.ibb.co/WDJ3ztB/barca-logo.png',
        title,
        offerLink,
        amount,
        buyerUsername,
        sellerUsername,
        description,
        deliveryDays,
        orderId,
        orderDue,
        requirements,
        orderUrl,
        originalDate,
        newDate,
        reason,
        subject,
        header,
        type,
        message,
        serviceFee,
        total,
        username,
        sender,
      };

      if (template === 'orderPlaced') {
        await sendEmail('orderPlaced', receiverEmail, locals);
        await sendEmail('orderReceipt', receiverEmail, locals);
      } else {
        await sendEmail(template, receiverEmail, locals);
      }
      channel.ack(msg!);
    });
  } catch (error) {
    log.log(
      'error',
      'NotificationService EmailConsumer consumeOrderEmailMessages() method: ',
      error,
    );
  }
};

export { consumeAuthEmailMessages, consumeOrderEmailMessages };
