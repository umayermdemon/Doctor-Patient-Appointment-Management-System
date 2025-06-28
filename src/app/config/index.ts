import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  mongodbUrl: process.env.MONGODB_URL,
  node_env: process.env.NODE_ENV,
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  },
};
