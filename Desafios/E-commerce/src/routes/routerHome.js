import { Router } from "express";
import path from "path";
import logger from "../utils/logger.js"
import { auth } from "../auth/auth.js";
const routerHome = new Router();

routerHome.get("/", auth, (req, res) => {
  logger.info("session", req.session.passport.user);
  res.render(path.join(process.cwd(), "/src/views/pages/index.ejs"), {
    name: req.session.passport.user,
  });
});

export default routerHome;
