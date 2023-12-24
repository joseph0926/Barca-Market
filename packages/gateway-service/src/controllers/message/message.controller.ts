import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { messageService } from '@gateway/services/api/message.service';

export class MessageController {
  public async getConversationController(
    req: Request,
    res: Response,
  ): Promise<void> {
    const response: AxiosResponse = await messageService.getConversation(
      req.params.senderUsername,
      req.params.receiverUsername,
    );
    res
      .status(StatusCodes.OK)
      .json({
        message: response.data.message,
        conversations: response.data.conversations,
      });
  }

  public async getMessagesController(
    req: Request,
    res: Response,
  ): Promise<void> {
    const response: AxiosResponse = await messageService.getMessages(
      req.params.senderUsername,
      req.params.receiverUsername,
    );
    res
      .status(StatusCodes.OK)
      .json({
        message: response.data.message,
        messages: response.data.messages,
      });
  }

  public async getConversationListController(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { username } = req.params;
    const response: AxiosResponse =
      await messageService.getConversationList(username);
    res
      .status(StatusCodes.OK)
      .json({
        message: response.data.message,
        conversations: response.data.conversations,
      });
  }

  public async getUserMessagesController(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { conversationId } = req.params;
    const response: AxiosResponse =
      await messageService.getUserMessages(conversationId);
    res
      .status(StatusCodes.OK)
      .json({
        message: response.data.message,
        messages: response.data.messages,
      });
  }

  public async createMessage(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await messageService.addMessage(req.body);
    res
      .status(StatusCodes.OK)
      .json({
        message: response.data.message,
        conversationId: response.data.conversationId,
        messageData: response.data.messageData,
      });
  }

  public async updateOfferController(
    req: Request,
    res: Response,
  ): Promise<void> {
    const response: AxiosResponse = await messageService.updateOffer(
      req.body.messageId,
      req.body.type,
    );
    res
      .status(StatusCodes.OK)
      .json({
        message: response.data.message,
        singleMessage: response.data.singleMessage,
      });
  }

  public async updateMarkMultipleMessagesController(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { messageId, senderUsername, receiverUsername } = req.body;
    const response: AxiosResponse =
      await messageService.markMultipleMessagesAsRead(
        receiverUsername,
        senderUsername,
        messageId,
      );
    res.status(StatusCodes.OK).json({ message: response.data.message });
  }

  public async updateMarkSingleMessageController(
    req: Request,
    res: Response,
  ): Promise<void> {
    const response: AxiosResponse = await messageService.markMessageAsRead(
      req.body.messageId,
    );
    res
      .status(StatusCodes.OK)
      .json({
        message: response.data.message,
        singleMessage: response.data.singleMessage,
      });
  }
}
