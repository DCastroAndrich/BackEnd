import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV + ".env"),
});

const config = {
  mongodb: {
    url:
      process.env.MONGO_URL ||
      "mongodb+srv://damianCA:165940@proyectobe.ejjql.mongodb.net/ecommercer?retryWrites=true&w=majority",
    secret: "#hashSecret#",
  },
  srv: {
    NODE_ENV: process.env.NODE_ENV || "production",
    PORT: process.env.PORT || 8080,
    MODE: process.env.MODE || "FORK",
    PERSISTENCE: process.env.PERSISTENCE || "MONGOATLAS",
  },
  jwt: {
    PRIVATE_KEY: process.env.PRIVATE_KEY,
  },
};

export default config;
