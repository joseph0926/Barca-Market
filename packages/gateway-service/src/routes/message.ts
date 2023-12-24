import { MessageController } from '@gateway/controllers/message/message.controller';
import express, { Router } from 'express';

class MessageRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get(
      '/message/conversation/:senderUsername/:receiverUsername',
      MessageController.prototype.getConversationController,
    );
    this.router.get(
      '/message/conversations/:username',
      MessageController.prototype.getConversationListController,
    );
    this.router.get(
      '/message/:senderUsername/:receiverUsername',
      MessageController.prototype.getMessagesController,
    );
    this.router.get(
      '/message/:conversationId',
      MessageController.prototype.getUserMessagesController,
    );
    this.router.post('/message', MessageController.prototype.createMessage);
    this.router.put(
      '/message/offer',
      MessageController.prototype.updateOfferController,
    );
    this.router.put(
      '/message/mark-as-read',
      MessageController.prototype.updateMarkSingleMessageController,
    );
    this.router.put(
      '/message/mark-multiple-as-read',
      MessageController.prototype.updateMarkMultipleMessagesController,
    );
    return this.router;
  }
}

export const messageRoutes: MessageRoutes = new MessageRoutes();
