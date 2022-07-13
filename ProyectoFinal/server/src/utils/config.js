import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV + ".env"),
});

const config = {
  mongodb: {
    url: process.env.MONGO_URL,
    secret: "#hashSecret#",
  },
  srv: {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 8080,
    MODE: process.env.MODE || "CLUSTER",
    PERSISTENCE: process.env.PERSISTENCE || "MEM",
  },
  jwt: {
    PRIVATE_KEY: process.env.PRIVATE_KEY
  }
};

export default config;
