import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV + ".env"),
});

const config = {
  mongodb: {
    url: process.env.MONGO_URL,
    secret: "#hashMode#"
  },
  firebase: {
    route:
      "../../DB/ecommerce-backend-43c06-firebase-adminsdk-54ok2-723cd01a3b.json",
  },
  fileDB: {
    path: "./DB"
  },
  srv: {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 8080,
    MODE: process.env.MODE || "CLUSTER",
    PERSISTENCE: process.env.PERSISTENCE || "MEM"
  },
};

export default config;
