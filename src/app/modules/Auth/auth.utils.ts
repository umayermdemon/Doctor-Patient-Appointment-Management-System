import { Types } from "mongoose";
import config from "../../config";
import jwt, { Secret, SignOptions } from "jsonwebtoken";

export const createToken = (
  jwtPayload: {
    id: Types.ObjectId;
    name: string;
    email: string;
  },
  secret: Secret,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn: expiresIn as SignOptions["expiresIn"],
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwt.accessTokenSecret as Secret);
};
