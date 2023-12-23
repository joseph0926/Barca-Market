import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { sellerService } from '@gateway/services/api/seller.service';

export class SellerController {
  public async getSellerByIdController(
    req: Request,
    res: Response,
  ): Promise<void> {
    const response: AxiosResponse = await sellerService.getSellerById(
      req.params.sellerId,
    );
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, seller: response.data.seller });
  }

  public async getSellerByUsernameController(
    req: Request,
    res: Response,
  ): Promise<void> {
    const response: AxiosResponse = await sellerService.getSellerByUsername(
      req.params.username,
    );
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, seller: response.data.seller });
  }

  public async getRandomSellersController(
    req: Request,
    res: Response,
  ): Promise<void> {
    const response: AxiosResponse = await sellerService.getRandomSellers(
      req.params.size,
    );
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, sellers: response.data.sellers });
  }

  public async createSellerController(
    req: Request,
    res: Response,
  ): Promise<void> {
    const response: AxiosResponse = await sellerService.createSeller(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ message: response.data.message, seller: response.data.seller });
  }

  public async updateSellerController(
    req: Request,
    res: Response,
  ): Promise<void> {
    const response: AxiosResponse = await sellerService.updateSeller(
      req.params.sellerId,
      req.body,
    );
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, seller: response.data.seller });
  }

  public async seedSeller(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await sellerService.seed(req.params.count);
    res.status(StatusCodes.OK).json({ message: response.data.message });
  }
}
