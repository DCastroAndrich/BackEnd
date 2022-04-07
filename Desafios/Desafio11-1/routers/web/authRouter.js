import { Router } from "express";
import path from "path";

const authRouter = new Router();

authRouter.get("/", (req, res) => {
  res.redirect("/home");
});

authRouter.get("/login", (req, res) => {
  const name = req.session.name;

  if (name) {
    res.redirect("/");
  } else {
    res.render(path.join(process.cwd(), "/views/pages/login.ejs"));
  }
});

authRouter.get("/logout", (req, res) => {
  const name = req.session.name;

  if (name) {
    req.session.destroy((err) => {
      if (!err) {
        res.render(path.join(process.cwd(), "/views/pages/logout.ejs"), {
          name,
        });
      } else {
        res.redirect("/");
      }
    });
  } else {
    res.redirect("/");
  }
});

authRouter.post("/login", (req, res) => {
  req.session.name = req.body.name;
  res.redirect("/home");
});


export default authRouter
