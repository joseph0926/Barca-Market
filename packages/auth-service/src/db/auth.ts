import { hash, compare } from 'bcrypt';

const SALT_ROUND = 10;

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await hash(password, SALT_ROUND);
  return hashedPassword;
};

export const comparePassword = async (
  inputPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  const isMatch = await compare(inputPassword, hashedPassword);
  return isMatch;
};
