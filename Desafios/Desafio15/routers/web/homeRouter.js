import { Router } from "express";
import path from "path";
import { auth, FBauth } from "../../src/auth/auth.js";
import { cpus } from "os";
import logger from "../../logger.js";

const homeRouter = new Router();

/* homeRouter.get("/home", auth, (req, res) => {
  res.render(path.join(process.cwd(), "/views/pages/index.ejs"), {
    name: req.session.name,
  });
}); */

homeRouter.get("/home", (req, res) => {
  const { url, method } = req;
  logger.info(`Accediendo a ${url}, método ${method}`);
  if (req.isAuthenticated()) {
    const userData = {
      name: req.user.displayName,
      photo: req.user.photos[0].value,
    };

    res.render(path.join(process.cwd(), "/views/pages/index.ejs"), {
      data: userData,
    });
  } else {
    res.redirect("/login");
  }
});

homeRouter.get("/productos-vista-test", (req, res) => {
  const { url, method } = req;
  logger.info(`Accediendo a ${url}, método ${method}`);
  res.render(path.join(process.cwd(), "/views/pages/faker.ejs"));
});

homeRouter.get("/info", (req, res) => {
  const { url, method } = req;
  logger.info(`Accediendo a ${url}, método ${method}`);
  const processData = {
    args: process.argv.slice(2),
    exPath: process.cwd(),
    platform: process.platform,
    processID: process.pid,
    version: process.version,
    memory: process.memoryUsage.rss(),
    cpus: cpus().length,
  };
  console.log("Data", processData);
  res.render(path.join(process.cwd(), "/views/pages/info.ejs"), {
    data: processData,
  });
});

export default homeRouter;
