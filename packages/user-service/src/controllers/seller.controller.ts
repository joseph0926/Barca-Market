import { BadRequestError } from '@base/custom-error-handler';
import { IBuyerDocument } from '@base/interfaces/buyer.interface';
import {
  IEducation,
  IExperience,
  ISellerDocument,
} from '@base/interfaces/seller.interface';
import { sellerSchema } from '@user/schemas/seller';
import { getRandomBuyers } from '@user/services/buyer.service';
import {
  createSeller,
  getRandomSellers,
  getSellerByEmail,
  getSellerById,
  getSellerByUsername,
  updateSeller,
} from '@user/services/seller.service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { floor, random, sample, sampleSize } from 'lodash';

const getSellerByIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const seller: ISellerDocument | null = await getSellerById(
    req.params.sellerId,
  );
  res.status(StatusCodes.OK).json({ message: 'Seller profile', seller });
};

const getSellerByUsernameController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const seller: ISellerDocument | null = await getSellerByUsername(
    req.params.username,
  );
  res.status(StatusCodes.OK).json({ message: 'Seller profile', seller });
};

const getRandomSellersController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const sellers: ISellerDocument[] = await getRandomSellers(
    parseInt(req.params.size, 10),
  );
  res
    .status(StatusCodes.OK)
    .json({ message: 'Random sellers profile', sellers });
};

const createSellerController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { error } = await Promise.resolve(sellerSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(
      error.details[0].message,
      'User createSellerController() method error',
    );
  }

  const existingSeller: ISellerDocument | null = await getSellerByEmail(
    req.body.email,
  );
  if (existingSeller) {
    throw new BadRequestError(
      'Seller already exist',
      'User createSellerController() method error',
    );
  }

  const seller: ISellerDocument = {
    profilePublicId: req.body.profilePublicId,
    fullName: req.body.fullName,
    username: req.currentUser!.username,
    email: req.body.email,
    profileImage: req.body.profileImage,
    description: req.body.description,
    oneliner: req.body.oneliner,
    country: req.body.country,
    skills: req.body.skills,
    languages: req.body.languages,
    responseTime: req.body.responseTime,
    experience: req.body.experience,
    education: req.body.education,
    socialLinks: req.body.socialLinks,
    certificates: req.body.certificates,
  };
  const createdSeller: ISellerDocument = await createSeller(seller);
  res
    .status(StatusCodes.CREATED)
    .json({ message: 'Seller 생성 성공.', seller: createdSeller });
};

const updateSellerController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { error } = await Promise.resolve(sellerSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(
      error.details[0].message,
      'Update updateSellerController() method error',
    );
  }
  const seller: ISellerDocument = {
    profilePublicId: req.body.profilePublicId,
    fullName: req.body.fullName,
    profileImage: req.body.profileImage,
    description: req.body.description,
    oneliner: req.body.oneliner,
    country: req.body.country,
    skills: req.body.skills,
    languages: req.body.languages,
    responseTime: req.body.responseTime,
    experience: req.body.experience,
    education: req.body.education,
    socialLinks: req.body.socialLinks,
    certificates: req.body.certificates,
  };
  const updatedSeller: ISellerDocument = await updateSeller(
    req.params.sellerId,
    seller,
  );
  res
    .status(StatusCodes.OK)
    .json({ message: 'Seller 업데이트 성공.', seller: updatedSeller });
};

const seedSeller = async (req: Request, res: Response): Promise<void> => {
  const { count } = req.params;
  const buyers: IBuyerDocument[] = await getRandomBuyers(parseInt(count, 10));
  for (let i = 0; i < buyers.length; i++) {
    const buyer: IBuyerDocument = buyers[i];
    const checkIfSellerExist: ISellerDocument | null = await getSellerByEmail(
      `${buyer.email}`,
    );
    if (checkIfSellerExist) {
      throw new BadRequestError(
        'Seller already exist.',
        'SellerSeed seedSeller() method error',
      );
    }
    const basicDescription: string = faker.commerce.productDescription();
    const skills: string[] = [
      'Programming',
      'Web development',
      'Mobile development',
      'Proof reading',
      'UI/UX',
      'Data Science',
      'Financial modeling',
      'Data analysis',
    ];
    const seller: ISellerDocument = {
      profilePublicId: uuidv4(),
      fullName: faker.person.fullName(),
      username: buyer.username,
      email: buyer.email,
      country: faker.location.country(),
      profileImage: buyer.profileImage,
      description:
        basicDescription.length <= 250
          ? basicDescription
          : basicDescription.slice(0, 250),
      oneliner: faker.word.words({ count: { min: 5, max: 10 } }),
      skills: sampleSize(skills, sample([1, 4])),
      languages: [
        { language: 'English', level: 'Native' },
        { language: 'Spnish', level: 'Basic' },
        { language: 'German', level: 'Basic' },
      ],
      responseTime: parseInt(faker.commerce.price({ min: 1, max: 5, dec: 0 })),
      experience: randomExperiences(
        parseInt(faker.commerce.price({ min: 2, max: 4, dec: 0 })),
      ),
      education: randomEducation(
        parseInt(faker.commerce.price({ min: 2, max: 4, dec: 0 })),
      ),
      socialLinks: [
        'https://kickchatapp.com',
        'http://youtube.com',
        'https://facebook.com',
      ],
      certificates: [
        {
          name: 'Flutter App Developer',
          from: 'Flutter Academy',
          year: 2021,
        },
        {
          name: 'Android App Developer',
          from: '2019',
          year: 2020,
        },
        {
          name: 'IOS App Developer',
          from: 'Apple Inc.',
          year: 2019,
        },
      ],
    };
    await createSeller(seller);
  }
  res
    .status(StatusCodes.CREATED)
    .json({ message: 'Sellers created successfully' });
};

const randomExperiences = (count: number): IExperience[] => {
  const result: IExperience[] = [];
  for (let i = 0; i < count; i++) {
    const randomStartYear = [2020, 2021, 2022, 2023, 2024, 2025];
    const randomEndYear = ['Present', '2024', '2025', '2026', '2027'];
    const endYear = randomEndYear[floor(random(0.9) * randomEndYear.length)];
    const experience = {
      company: faker.company.name(),
      title: faker.person.jobTitle(),
      startDate: `${faker.date.month()} ${
        randomStartYear[floor(random(0.9) * randomStartYear.length)]
      }`,
      endDate:
        endYear === 'Present' ? 'Present' : `${faker.date.month()} ${endYear}`,
      description: faker.commerce.productDescription().slice(0, 100),
      currentlyWorkingHere: endYear === 'Present',
    };
    result.push(experience);
  }
  return result;
};

const randomEducation = (count: number): IEducation[] => {
  const result: IEducation[] = [];
  for (let i = 0; i < count; i++) {
    const randomYear = [2020, 2021, 2022, 2023, 2024, 2025];
    const education = {
      country: faker.location.country(),
      university: faker.person.jobTitle(),
      title: faker.person.jobTitle(),
      major: `${faker.person.jobArea()} ${faker.person.jobDescriptor()}`,
      year: `${randomYear[floor(random(0.9) * randomYear.length)]}`,
    };
    result.push(education);
  }
  return result;
};

export {
  getRandomSellersController,
  getSellerByIdController,
  getSellerByUsernameController,
  createSellerController,
  updateSellerController,
  seedSeller,
  randomEducation,
  randomExperiences,
};
