import { IBuyerDocument } from '@base/interfaces/buyer.interface';
import {
  getBuyerByEmail,
  getBuyerByUsername,
} from '@user/services/buyer.service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const getBuyerByCurrentUserEmail = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const buyer: IBuyerDocument | null = await getBuyerByEmail(
    req.currentUser!.email,
  );

  res.status(StatusCodes.OK).json({ message: 'Buyer Profile', buyer });
};

const getBuyerByCurrentUserUsername = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const buyer: IBuyerDocument | null = await getBuyerByUsername(
    req.currentUser!.username,
  );

  res.status(StatusCodes.OK).json({ message: 'Buyer Profile', buyer });
};

const getBuyerUserByUsername = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const buyer: IBuyerDocument | null = await getBuyerByUsername(
    req.params.username,
  );

  res.status(StatusCodes.OK).json({ message: 'Buyer Profile', buyer });
};

export {
  getBuyerByCurrentUserEmail,
  getBuyerByCurrentUserUsername,
  getBuyerUserByUsername,
};
