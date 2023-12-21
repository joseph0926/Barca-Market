import { PrismaClient, User } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}

export function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[],
): Omit<User, Key> {
  const result = {} as Omit<User, Key>;

  for (const key in user) {
    if (keys.indexOf(key as unknown as Key) === -1) {
      (result as any)[key] = user[key];
    }
  }

  return result;
}
