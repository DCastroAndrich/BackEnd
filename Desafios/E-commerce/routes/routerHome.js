import { Router } from "express";
import path from "path";
import { auth } from "../auth/auth.js";
const routerHome = new Router();

routerHome.get("/", (req, res) => {
  console.log("session", req.session.passport.user);
  res.render(path.join(process.cwd(), "/views/pages/index.ejs"), {
    name: req.session.passport.user,
  });
});

export default routerHome;
