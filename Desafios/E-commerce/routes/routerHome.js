import { Router } from "express";
import path from "path";
import { auth } from "../auth/auth.js";
const routerHome = new Router();

routerHome.get("/", auth, (req, res) => {
  res.render(path.join(process.cwd(), "/views/pages/index.ejs"), {
    name: req.session.name,
  });
});


export default routerHome;
