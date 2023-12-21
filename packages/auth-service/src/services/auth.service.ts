import { db, exclude } from '@auth/db/db';
import { publishDirectMessage } from '@auth/queues/auth.producer';
import { authChannel } from '@auth/server';
import { User } from '@prisma/client';

interface IAuthBuyerMessageDetails {
  username?: string;
  email?: string;
  profileImage?: string;
  country?: string;
  type?: string;
  createdAt?: Date;
}

export const createUser = async (
  data: User,
): Promise<Omit<User, 'password'>> => {
  const result = await db.user.create({
    data,
  });

  const messageDetails: IAuthBuyerMessageDetails = {
    username: result.username,
    email: result.email,
    profileImage: result.profileImage,
    country: result.country,
    createdAt: result.createdAt,
    type: 'auth',
  };

  await publishDirectMessage(
    authChannel,
    'barca-buyer-update',
    'user-buyer',
    JSON.stringify(messageDetails),
    'Buyer Details sent to buyer service',
  );

  const { password, ...userData } = result;

  return userData;
};

export const getAuthUserById = async (
  userId: string,
): Promise<Omit<User, 'password'> | null> => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user) {
    const userWithoutPassword = exclude(user, ['password']);
    return userWithoutPassword;
  }

  return null;
};

export const getAuthUserByUsernameOREmail = async (
  username: string,
  email: string,
): Promise<Omit<User, 'password'> | null> => {
  const user = await db.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (user) {
    const userWithoutPassword = exclude(user, ['password']);
    return userWithoutPassword;
  }

  return null;
};

export const getAuthUserByUsername = async (
  username: string,
): Promise<Omit<User, 'password'> | null> => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (user) {
    const userWithoutPassword = exclude(user, ['password']);
    return userWithoutPassword;
  }

  return null;
};

export const getAuthUserByEmail = async (
  email: string,
): Promise<Omit<User, 'password'> | null> => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    const userWithoutPassword = exclude(user, ['password']);
    return userWithoutPassword;
  }

  return null;
};

export const getAuthUserByVerificationToken = async (
  token: string,
): Promise<Omit<User, 'password'> | null> => {
  const user = await db.user.findUnique({
    where: {
      emailVerificationToken: token,
    },
  });

  if (user) {
    const userWithoutPassword = exclude(user, ['password']);
    return userWithoutPassword;
  }

  return null;
};

export const getAuthUserByPasswordToken = async (
  token: string,
): Promise<Omit<User, 'password'> | null> => {
  const user = await db.user.update({
    where: { passwordResetToken: token },
    data: {
      passwordResetExpires: new Date(),
    },
  });

  if (user) {
    const userWithoutPassword = exclude(user, ['password']);
    return userWithoutPassword;
  }

  return null;
};
