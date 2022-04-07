import { Router } from "express";
import path from "path";
import { auth } from "../../src/auth/auth.js";

const homeRouter = new Router();

homeRouter.get("/home", auth, (req, res) => {
  res.render(path.join(process.cwd(), "/views/pages/index.ejs"), {
    name: req.session.name,
  });
});

homeRouter.get("/productos-vista-test", (req, res) => {
  res.render(path.join(process.cwd(), "/views/pages/faker.ejs"));
});

export default homeRouter;
