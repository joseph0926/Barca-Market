import jwt, { Secret } from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const privateKey: Secret = process.env.JWT_SECRET!;

export const createJwtToken = ({ id, email }: JwtUser) => {
  const userJwt = jwt.sign(
    {
      id,
      email,
    },
    privateKey
  );

  return userJwt;
};
