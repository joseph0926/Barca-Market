import { BadRequestError } from '@base/custom-error-handler';
import { gigCreateSchema, gigUpdateSchema } from '@gig/schemas/gig';
import { UploadApiResponse } from 'cloudinary';
import { Request, Response } from 'express';
import { uploads } from '@base/cloudinary-upload';
import { ISellerGig } from '@base/interfaces/gig.interface';
import {
  createGig,
  deleteGig,
  getGigById,
  getSellerGigs,
  getSellerPausedGigs,
  updateActiveGigProp,
  updateGig,
} from '@gig/services/gig.service';
import { StatusCodes } from 'http-status-codes';
import { getDocumentCount } from '@gig/elasticsearch';
import { getUserSelectedGigCategory } from '@gig/redis/gig.cache';
import {
  getMoreGigsLikeThis,
  getTopRatedGigsByCategory,
  gigsSearch,
  gigsSearchByCategory,
} from '@gig/services/search.service';
import {
  IPaginateProps,
  ISearchResult,
} from '@base/interfaces/search.interface';
import { isDataURL } from '@base/helpers';
import { sortBy } from 'lodash';
import { publishDirectMessage } from '@gig/queues/gig.producer';
import { gigChannel } from '@gig/server';

const getGigByIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const gig: ISellerGig = await getGigById(req.params.gigId);
  res.status(StatusCodes.OK).json({ message: 'Get gig by id', gig });
};

const getSellerGigsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const gigs: ISellerGig[] = await getSellerGigs(req.params.sellerId);
  res.status(StatusCodes.OK).json({ message: 'Seller gigs', gigs });
};

const getSellerPausedGigsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const gigs: ISellerGig[] = await getSellerPausedGigs(req.params.sellerId);
  res.status(StatusCodes.OK).json({ message: 'Seller gigs', gigs });
};

const getTopRatedGigsByCategoryController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const category = await getUserSelectedGigCategory(
    `selectedCategories:${req.params.username}`,
  );
  const resultHits: ISellerGig[] = [];
  const gigs: ISearchResult = await getTopRatedGigsByCategory(`${category}`);
  for (const item of gigs.hits) {
    resultHits.push(item._source as ISellerGig);
  }
  res.status(StatusCodes.OK).json({
    message: 'Search top gigs results',
    total: gigs.total,
    gigs: resultHits,
  });
};

const getUserSelectedGigCategoryController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const category = await getUserSelectedGigCategory(
    `selectedCategories:${req.params.username}`,
  );
  const resultHits: ISellerGig[] = [];
  const gigs: ISearchResult = await gigsSearchByCategory(`${category}`);
  for (const item of gigs.hits) {
    resultHits.push(item._source as ISellerGig);
  }
  res.status(StatusCodes.OK).json({
    message: 'Search gigs category results',
    total: gigs.total,
    gigs: resultHits,
  });
};

const getMoreGigsLikeThisController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const resultHits: ISellerGig[] = [];
  const gigs: ISearchResult = await getMoreGigsLikeThis(req.params.gigId);
  for (const item of gigs.hits) {
    resultHits.push(item._source as ISellerGig);
  }
  res.status(StatusCodes.OK).json({
    message: 'More gigs like this result',
    total: gigs.total,
    gigs: resultHits,
  });
};

const createGigController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { error } = await Promise.resolve(gigCreateSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(
      error.details[0].message,
      'Gig createGigController() method',
    );
  }

  const result: UploadApiResponse = (await uploads(
    req.body.coverImage,
  )) as UploadApiResponse;
  if (!result.public_id) {
    throw new BadRequestError(
      'File upload error',
      'Gig createGigController() method',
    );
  }

  const count: number = await getDocumentCount('gigs');

  const gig: ISellerGig = {
    sellerId: req.body.sellerId,
    username: req.currentUser!.username,
    email: req.currentUser!.email,
    profileImage: req.body.profileImage,
    title: req.body.title,
    description: req.body.description,
    categories: req.body.categories,
    subCategories: req.body.subCategories,
    tags: req.body.tags,
    price: req.body.price,
    expectedDelivery: req.body.expectedDelivery,
    basicTitle: req.body.basicTitle,
    basicDescription: req.body.basicDescription,
    coverImage: `${result?.secure_url}`,
    sortId: count + 1,
  };

  const createdGig: ISellerGig = await createGig(gig);

  res
    .status(StatusCodes.CREATED)
    .json({ message: 'Gig created successfully', gig: createdGig });
};

const updateGigController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { error } = await Promise.resolve(gigUpdateSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'Update gig() method');
  }
  const isDataUrl = isDataURL(req.body.coverImage);
  let coverImage = '';
  if (isDataUrl) {
    const result: UploadApiResponse = (await uploads(
      req.body.coverImage,
    )) as UploadApiResponse;
    if (!result.public_id) {
      throw new BadRequestError(
        'File upload error. Try again.',
        'Update gig() method',
      );
    }
    coverImage = result?.secure_url;
  } else {
    coverImage = req.body.coverImage;
  }
  const gig: ISellerGig = {
    title: req.body.title,
    description: req.body.description,
    categories: req.body.categories,
    subCategories: req.body.subCategories,
    tags: req.body.tags,
    price: req.body.price,
    expectedDelivery: req.body.expectedDelivery,
    basicTitle: req.body.basicTitle,
    basicDescription: req.body.basicDescription,
    coverImage,
  };
  const updatedGig: ISellerGig = await updateGig(req.params.gigId, gig);
  res
    .status(StatusCodes.OK)
    .json({ message: 'Gig updated successfully.', gig: updatedGig });
};

const updateGigActiveController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const updatedGig: ISellerGig = await updateActiveGigProp(
    req.params.gigId,
    req.body.active,
  );
  res
    .status(StatusCodes.OK)
    .json({ message: 'Gig updated successfully.', gig: updatedGig });
};

const deleteGigController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  await deleteGig(req.params.gigId, req.params.sellerId);
  res.status(StatusCodes.OK).json({ message: 'Gig deleted successfully.' });
};

const searchGigsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { from, size, type } = req.params;
  let resultHits: ISellerGig[] = [];
  const paginate: IPaginateProps = { from, size: parseInt(`${size}`), type };
  const gigs: ISearchResult = await gigsSearch(
    `${req.query.query}`,
    paginate,
    `${req.query.delivery_time}`,
    parseInt(`${req.query.minprice}`),
    parseInt(`${req.query.maxprice}`),
  );
  for (const item of gigs.hits) {
    resultHits.push(item._source as ISellerGig);
  }
  if (type === 'backward') {
    resultHits = sortBy(resultHits, ['sortId']);
  }
  res.status(StatusCodes.OK).json({
    message: 'Search gigs results',
    total: gigs.total,
    gigs: resultHits,
  });
};

const seedGigsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { count } = req.params;
  await publishDirectMessage(
    gigChannel,
    'barca-gig',
    'get-sellers',
    JSON.stringify({ type: 'getSellers', count }),
    'Gig seed message sent to user service.',
  );
  res.status(StatusCodes.CREATED).json({ message: 'Gig created successfully' });
};

export {
  createGigController,
  getGigByIdController,
  getSellerGigsController,
  getSellerPausedGigsController,
  getTopRatedGigsByCategoryController,
  getUserSelectedGigCategoryController,
  getMoreGigsLikeThisController,
  updateGigController,
  updateGigActiveController,
  deleteGigController,
  searchGigsController,
  seedGigsController,
};
