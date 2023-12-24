import {
  addReview,
  getReviewsByGigId,
  getReviewsBySellerId,
} from '@review/services/review.service';
import { IReviewDocument } from '@base/interfaces/review.interface';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const getReviewsByGigIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const reviews: IReviewDocument[] = await getReviewsByGigId(req.params.gigId);
  res
    .status(StatusCodes.OK)
    .json({ message: 'Gig reviews by gig id', reviews });
};

export const getReviewsBySellerIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const reviews: IReviewDocument[] = await getReviewsBySellerId(
    req.params.sellerId,
  );
  res
    .status(StatusCodes.OK)
    .json({ message: 'Gig reviews by seller id', reviews });
};

export const createReview = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const review: IReviewDocument = await addReview(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ message: 'Review created successfully.', review });
};
