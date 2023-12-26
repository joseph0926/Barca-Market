import crypto from 'crypto';

import {
  createAuthUser,
  getAuthUserByUsernameOREmail,
} from '@auth/services/auth.service';
import { faker } from '@faker-js/faker';
import { BadRequestError } from '@base/custom-error-handler';
import { Request, Response } from 'express';
import { generateUsername } from 'unique-username-generator';
import { v4 as uuidV4 } from 'uuid';
import { sample } from 'lodash';
import { StatusCodes } from 'http-status-codes';
import { User } from '@prisma/client';

export async function create(req: Request, res: Response): Promise<void> {
  const { count } = req.params;
  const usernames: string[] = [];
  for (let i = 0; i < parseInt(count, 10); i++) {
    const username: string = generateUsername('', 0, 12);
    usernames.push(username);
  }

  for (let i = 0; i < usernames.length; i++) {
    const username = usernames[i];
    const email = faker.internet.email();
    const password = 'qwerty';
    const country = faker.location.country();
    const profileImage = faker.image.urlPicsumPhotos();
    const checkIfUserExist = await getAuthUserByUsernameOREmail(
      username,
      email,
    );
    if (checkIfUserExist) {
      throw new BadRequestError(
        'Invalid credentials. Email or Username',
        'Seed create() method error',
      );
    }
    const profilePublicId = uuidV4();
    const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
    const randomChar: string = randomBytes.toString('hex');
    const authData: User = {
      username,
      email,
      profilePublicId,
      password,
      country,
      profileImage,
      emailVerificationToken: randomChar,
      emailVerified: sample([false, true]),
    } as User;
    await createAuthUser(authData);
  }
  res
    .status(StatusCodes.OK)
    .json({ message: 'Seed user created successfully.' });
}
