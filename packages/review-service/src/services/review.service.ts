import { publishFanoutMessage } from '@review/queues/review.producer';
import { reviewChannel } from '@review/server';
import {
  IReviewDocument,
  IReviewMessageDetails,
} from '@base/interfaces/review.interface';
import { db } from '@review/db';

const addReview = async (data: IReviewDocument): Promise<IReviewDocument> => {
  const {
    gigId,
    reviewerId,
    reviewerImage,
    sellerId,
    review,
    rating,
    orderId,
    reviewType,
    reviewerUsername,
    country,
  } = data;
  const createdAtDate = new Date();

  const reviewData = await db.review.create({
    data: {
      gigId,
      reviewerId,
      reviewerImage,
      sellerId,
      review,
      rating,
      orderId,
      reviewType: reviewType!,
      reviewerUsername,
      country,
    },
  });
  const messageDetails: IReviewMessageDetails = {
    gigId: data.gigId,
    reviewerId: data.reviewerId,
    sellerId: data.sellerId,
    review: data.review,
    rating: data.rating,
    orderId: data.orderId,
    createdAt: `${createdAtDate}`,
    type: `${reviewType}`,
  };
  await publishFanoutMessage(
    reviewChannel,
    'barca-review',
    JSON.stringify(messageDetails),
    'Review details sent to order and users services',
  );

  return reviewData;
};

const getReviewsByGigId = async (gigId: string): Promise<IReviewDocument[]> => {
  const reviews = await db.review.findMany({
    where: {
      gigId,
    },
  });

  return reviews;
};

const getReviewsBySellerId = async (
  sellerId: string,
): Promise<IReviewDocument[]> => {
  const reviews = await db.review.findMany({
    where: {
      sellerId,
    },
  });

  return reviews;
};

export { addReview, getReviewsByGigId, getReviewsBySellerId };
