import bcryptjs from "bcryptjs";

export const hashPassword = async (password: string) => {
  const salt = await bcryptjs.genSalt(12);
  const hashedPassword = await bcryptjs.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (
  storedPassword: string,
  suppliedPassword: string
) => {
  const toEqule = await bcryptjs.compare(suppliedPassword, storedPassword);
  return toEqule;
};
