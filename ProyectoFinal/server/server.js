import "dotenv/config";
import express from "express";
import config from "./src/utils/config.js";
import cluster from "cluster";
import { cpus } from "os";
import logger from "./src/utils/logger.js";
import ProductsRouter from "./src/routes/products.routes.js";
import CartsRouter from "./src/routes/carts.routes.js";
import compression from "compression";
import bodyParser from "body-parser";

const app = express();
const numCpus = cpus().length;

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/* ROUTES */

app.use("/productos/", new ProductsRouter().start());
app.use("/carrito/", new CartsRouter().start());

/* SERVER LISTEN */

const PORT = config.srv.PORT;

switch (config.srv.MODE) {
  case "CLUSTER":
    if (cluster.isPrimary) {
      logger.info("CPU's", numCpus);
      for (let i = 0; i < numCpus; i++) {
        cluster.fork();
      }

      cluster.on("exit", (worker) => {
        logger.info(
          `Worker ${
            worker.process.pid
          } finished at ${new Date().toLocaleString()}`
        );
        cluster.fork();
      });
    } else {
      const server = app.listen(PORT, () => {
        logger.info(
          `Express server listen on port ${server.address().port} - PID ${
            process.pid
          } - at ${new Date().toLocaleString()}`
        );
      });
      server.on("error", (error) => logger.error(`Server error ${error}`));
    }

    break;

  default:
    const server = app.listen(PORT, () => {
      logger.info(`Express server listen on port ${server.address().port}`);
    });
    server.on("error", (error) => logger.error(`Server error ${error}`));
    break;
}
