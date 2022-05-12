import { Router } from "express";
import path from "path";

const routerAuth = new Router();

routerAuth.get("/", (req, res) => {
  res.redirect("/home");
});

// ==== LOGIN CON SESSION ====

routerAuth.get("/login", (req, res) => {
  const username = req.session.username;
  if (username) {
    res.redirect("/");
  } else {
    res.render(path.join(process.cwd(), "/views/pages/login.ejs"));
  }
});

// ==== LOGOUT CON SESSION ====
routerAuth.get("/logout", (req, res) => {
  const username = req.session.username;
  if (username) {
    req.session.destroy((err) => {
      if (!err) {
        res.render(path.join(process.cwd(), "/views/pages/logout.ejs"), {
          username,
        });
      } else {
        res.redirect("/");
      }
    });
  } else {
    res.redirect("/");
  }
});
