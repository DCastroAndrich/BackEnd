import { Router } from "express";
import path from "path";
import { auth, FBauth } from "../../src/auth/auth.js";

const homeRouter = new Router();

/* homeRouter.get("/home", auth, (req, res) => {
  res.render(path.join(process.cwd(), "/views/pages/index.ejs"), {
    name: req.session.name,
  });
}); */

homeRouter.get("/home", (req, res) => {
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
  res.render(path.join(process.cwd(), "/views/pages/faker.ejs"));
});

export default homeRouter;
