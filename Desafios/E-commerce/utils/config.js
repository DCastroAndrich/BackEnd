import yargs from "yargs";

const args = yargs(process.argv.slice(2)).default({
  port: 8080,
  mode: "CLUSTER",
}).argv;

export default {
  PORT: args,
  MODE: args.mode,
  mongodb: {
    url: process.env.MONGO_URL,
  },
  firebase: {
    route:
      "./db/ecommerce-backend-43c06-firebase-adminsdk-54ok2-723cd01a3b.json",
  },
};
