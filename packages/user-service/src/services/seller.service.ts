import { ISellerDocument } from '@base/interfaces/seller.interface';
import { SellerModel } from '@user/models/seller.schema';
import mongoose from 'mongoose';
import { updateBuyerIsSellerProp } from '@user/services/buyer.service';
import { IOrderMessage } from '@base/interfaces/order.interface';
import {
  IRatingTypes,
  IReviewMessageDetails,
} from '@base/interfaces/review.interface';

const getSellerById = async (
  sellerId: string,
): Promise<ISellerDocument | null> => {
  const seller = await SellerModel.findOne({
    _id: new mongoose.Types.ObjectId(sellerId),
  }).exec();
  return seller;
};

const getSellerByUsername = async (
  username: string,
): Promise<ISellerDocument | null> => {
  const seller = await SellerModel.findOne({ username }).exec();
  return seller;
};

const getSellerByEmail = async (
  email: string,
): Promise<ISellerDocument | null> => {
  const seller = await SellerModel.findOne({ email }).exec();
  return seller;
};

const getRandomSellers = async (count: number): Promise<ISellerDocument[]> => {
  const sellers = await SellerModel.aggregate([{ $sample: { size: count } }]);
  return sellers;
};

const createSeller = async (
  sellerData: ISellerDocument,
): Promise<ISellerDocument> => {
  const createdSeller = await SellerModel.create(sellerData);
  await updateBuyerIsSellerProp(`${createdSeller.email}`);
  return createdSeller;
};

const updateSeller = async (
  sellerId: string,
  sellerData: ISellerDocument,
): Promise<ISellerDocument> => {
  const updatedSeller = (await SellerModel.findOneAndUpdate(
    { _id: sellerId },
    {
      $set: {
        profilePublicId: sellerData.profilePublicId,
        fullName: sellerData.fullName,
        profilePicture: sellerData.profilePicture,
        description: sellerData.description,
        country: sellerData.country,
        skills: sellerData.skills,
        oneliner: sellerData.oneliner,
        languages: sellerData.languages,
        responseTime: sellerData.responseTime,
        experience: sellerData.experience,
        education: sellerData.education,
        socialLinks: sellerData.socialLinks,
        certificates: sellerData.certificates,
      },
    },
    { new: true },
  ).exec()) as ISellerDocument;

  return updatedSeller;
};

const updateTotalGigsCount = async (
  sellerId: string,
  count: number,
): Promise<void> => {
  await SellerModel.updateOne(
    { _id: sellerId },
    { $inc: { totalGigs: count } },
  ).exec();
};

const updateSellerOngoingJobsProp = async (
  sellerId: string,
  ongoingJobs: number,
): Promise<void> => {
  await SellerModel.updateOne(
    { _id: sellerId },
    { $inc: { ongoingJobs } },
  ).exec();
};

const updateSellerCancelledJobsProp = async (
  sellerId: string,
): Promise<void> => {
  await SellerModel.updateOne(
    { _id: sellerId },
    { $inc: { ongoingJobs: -1, cancelledJobs: 1 } },
  ).exec();
};

const updateSellerCompletedJobsProp = async (
  data: IOrderMessage,
): Promise<void> => {
  const {
    sellerId,
    ongoingJobs,
    completedJobs,
    totalEarnings,
    recentDelivery,
  } = data;
  await SellerModel.updateOne(
    { _id: sellerId },
    {
      $inc: {
        ongoingJobs,
        completedJobs,
        totalEarnings,
      },
      $set: { recentDelivery: new Date(recentDelivery!) },
    },
  ).exec();
};

const updateSellerReview = async (
  data: IReviewMessageDetails,
): Promise<void> => {
  const ratingTypes: IRatingTypes = {
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
  };
  const ratingKey: string = ratingTypes[`${data.rating}`];
  await SellerModel.updateOne(
    { _id: data.sellerId },
    {
      $inc: {
        ratingsCount: 1,
        ratingSum: data.rating,
        [`ratingCategories.${ratingKey}.value`]: data.rating,
        [`ratingCategories.${ratingKey}.count`]: 1,
      },
    },
  ).exec();
};

export {
  getRandomSellers,
  getSellerByEmail,
  getSellerById,
  getSellerByUsername,
  createSeller,
  updateSeller,
  updateBuyerIsSellerProp,
  updateSellerCancelledJobsProp,
  updateSellerCompletedJobsProp,
  updateSellerOngoingJobsProp,
  updateSellerReview,
  updateTotalGigsCount,
};
