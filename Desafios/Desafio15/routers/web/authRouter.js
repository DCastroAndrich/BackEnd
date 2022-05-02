import { Router } from "express";
import path from "path";
const authRouter = new Router();
import passport from "passport";
import logger from "../../logger.js";

authRouter.get("/", (req, res) => {
  const { url, method } = req;
  logger.info(`Accediendo a ${url}, método ${method}`);
  res.redirect("/home");
});

//------Login por session----------

/* authRouter.get("/login", (req, res) => {
  const name = req.session.name;

  if (name) {
    res.redirect("/");
  } else {
    res.render(path.join(process.cwd(), "/views/pages/login.ejs"));
  }
}); */

//------Login con Facebook---------

authRouter.get("/login", (req, res) => {
  const { url, method } = req;
  logger.info(`Accediendo a ${url}, método ${method}`);
  //const name = req.user.name;

  res.render(path.join(process.cwd(), "/views/pages/fb-login"));
  /* if (name) {
    res.redirect("/");
  } else {
  } */
});

authRouter.get("/auth/facebook", passport.authenticate("facebook"));

authRouter.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/",
    successRedirect: "/home",
    authType: "reauthenticate",
  })
);

//----------Logout con Session---------

/* authRouter.get("/logout", (req, res) => {
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
}); */

//-----------Logout con facebook----------

authRouter.get("/logout", (req, res) => {
  const { url, method } = req;
  logger.info(`Accediendo a ${url}, método ${method}`);
  req.logout();
  res.render(path.join(process.cwd(), "views/pages/logout.ejs"));
});
/*   if (name) {
    req.logout((err) => {
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
  } */

/* authRouter.post("/login", (req, res) => {
  req.session.name = req.body.name;
  res.redirect("/home");
}); */

authRouter.post("/login", (req, res) => {
  const { url, method } = req;
  logger.info(`Accediendo a ${url}, método ${method}`);
  req.user.name = req.body.name;
  res.redirect("/home");
});

export default authRouter;
