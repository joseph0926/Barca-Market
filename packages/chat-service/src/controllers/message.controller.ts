import {
  addMessage,
  createConversation,
  getConversation,
  getMessages,
  getUserConversationList,
  getUserMessages,
  markManyMessagesAsRead,
  markMessageAsRead,
  updateOffer,
} from '@chat/services/message.service';
import {
  IConversationDocument,
  IMessageDocument,
} from '@base/interfaces/chat.interface';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '@base/custom-error-handler';
import crypto from 'crypto';
import { uploads } from '@base/cloudinary-upload';
import { UploadApiResponse } from 'cloudinary';
import { messageSchema } from '@chat/schemas/message';

const getConversationController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { senderUsername, receiverUsername } = req.params;
  const conversations: IConversationDocument[] = await getConversation(
    senderUsername,
    receiverUsername,
  );
  res
    .status(StatusCodes.OK)
    .json({ message: 'Chat conversation', conversations });
};

const getMessagesController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { senderUsername, receiverUsername } = req.params;
  const messages: IMessageDocument[] = await getMessages(
    senderUsername,
    receiverUsername,
  );
  res.status(StatusCodes.OK).json({ message: 'Chat messages', messages });
};

const getConversationListController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { username } = req.params;
  const messages: IMessageDocument[] = await getUserConversationList(username);
  res
    .status(StatusCodes.OK)
    .json({ message: 'Conversation list', conversations: messages });
};

const getUserMessagesController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { conversationId } = req.params;
  const messages: IMessageDocument[] = await getUserMessages(conversationId);
  res.status(StatusCodes.OK).json({ message: 'Chat messages', messages });
};

const createMessageController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { error } = await Promise.resolve(messageSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(
      error.details[0].message,
      'Create message() method',
    );
  }
  let file: string = req.body.file;
  const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
  const randomCharacters: string = randomBytes.toString('hex');
  let result: UploadApiResponse;
  if (file) {
    result = (
      req.body.fileType === 'zip'
        ? await uploads(file, `${randomCharacters}.zip`)
        : await uploads(file)
    ) as UploadApiResponse;
    if (!result.public_id) {
      throw new BadRequestError(
        'File upload error. Try again',
        'Create message() method',
      );
    }
    file = result?.secure_url;
  }
  const messageData: IMessageDocument = {
    conversationId: req.body.conversationId,
    body: req.body.body,
    file,
    fileType: req.body.fileType,
    fileSize: req.body.fileSize,
    fileName: req.body.fileName,
    gigId: req.body.gigId,
    buyerId: req.body.buyerId,
    sellerId: req.body.sellerId,
    senderUsername: req.body.senderUsername,
    senderPicture: req.body.senderPicture,
    receiverUsername: req.body.receiverUsername,
    receiverPicture: req.body.receiverPicture,
    isRead: req.body.isRead,
    hasOffer: req.body.hasOffer,
    offer: req.body.offer,
  };
  if (!req.body.hasConversationId) {
    await createConversation(
      `${messageData.conversationId}`,
      `${messageData.senderUsername}`,
      `${messageData.receiverUsername}`,
    );
  }
  await addMessage(messageData);
  res.status(StatusCodes.OK).json({
    message: 'Message added',
    conversationId: req.body.conversationId,
    messageData,
  });
};

const updateOfferController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { messageId, type } = req.body;
  const message: IMessageDocument = await updateOffer(messageId, type);
  res
    .status(StatusCodes.OK)
    .json({ message: 'Message updated', singleMessage: message });
};

const updateMarkMultipleMessagesController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { messageId, senderUsername, receiverUsername } = req.body;
  await markManyMessagesAsRead(receiverUsername, senderUsername, messageId);
  res.status(StatusCodes.OK).json({ message: 'Messages marked as read' });
};

const updateMarkSingleMessageController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { messageId } = req.body;
  const message: IMessageDocument = await markMessageAsRead(messageId);
  res
    .status(StatusCodes.OK)
    .json({ message: 'Message marked as read', singleMessage: message });
};

export {
  getMessagesController,
  getConversationController,
  getConversationListController,
  getUserMessagesController,
  createMessageController,
  updateMarkMultipleMessagesController,
  updateMarkSingleMessageController,
  updateOfferController,
};
