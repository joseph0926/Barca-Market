import { buyerService } from '@gateway/services/api/buyer.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class BuyerController {
  public async getBuyerByCurrentUserEmail(
    _req: Request,
    res: Response,
  ): Promise<void> {
    const response: AxiosResponse = await buyerService.getBuyerByEmail();

    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, user: response.data.user });
  }

  public async getBuyerByCurrentUserUsername(
    _req: Request,
    res: Response,
  ): Promise<void> {
    const response: AxiosResponse =
      await buyerService.getCurrentBuyerByUsername();

    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, user: response.data.user });
  }

  public async getBuyerUserByUsername(
    req: Request,
    res: Response,
  ): Promise<void> {
    const response: AxiosResponse = await buyerService.getBuyerByUsername(
      req.params.username,
    );

    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, user: response.data.user });
  }
}
