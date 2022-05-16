import passport from "passport";
import { Strategy } from "passport-local";
const LocalStrategy = Strategy;
import bcrypt from "bcrypt";

import { Router } from "express";
import path from "path";

import multer from "multer";

import UsersDAOMongoDB from "../containers/DAO's/users/UsersDAOMongoDB.js";
const Users = new UsersDAOMongoDB();

const routerAuth = new Router();



// ==== MULTER ====

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/users");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

const upload = multer({ storage: storage });


// ==== PASSPORT LOCAL ====

let strategy = new LocalStrategy(async (username, password, done) => {
  let user;
  try {
    user = await Users.findUser(username);
    if (!user) {
      return done(null, false);
    }
  } catch (error) {
    return error;
  }
  let verifyPassword = await bcrypt.compare(password, user.password);
  if (!verifyPassword) {
    return done(null, false);
  }
  return done(null, user);
});

/* passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await Users.findUser(username, (error, doc) => {
      if (error === "error") {
        return done(error);
      }
      const verifyPassword = bcrypt.compare(password, doc.password);
      if (!verifyPassword) {
        return null, false;
      }
      return done(null, user);
    });
  })
);
 */

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.username);
});
passport.deserializeUser(async (username, done) => {
  try {
    let user = await Users.findUser(username);
    if (!user) {
      return done(new Error("user not found"));
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
  done(null, user);
});



/* RUTAS */

routerAuth.get("/", (req, res) => {
  res.redirect("/login");
});

// ==== LOGIN CON SESSION ====

routerAuth.get("/login", (req, res) => {
  const username = req.session.username;
  if (username) {
    res.redirect("/home");
  } else {
    res.render(path.join(process.cwd(), "/views/pages/login.ejs"));
  }
});

routerAuth.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login-error",
  })
);

routerAuth.get("/login-error", (req, res) => {
  res.render(path.join(process.cwd(), "/views/pages/login-error.ejs"));
});

// ==== REGISTER NEW USER ====

routerAuth.get("/register", (req, res) => {
  res.render(path.join(process.cwd(), "/views/pages/register.ejs"));
});

routerAuth.post("/register", upload.single("avatar"), async (req, res) => {
  const newUser = await Users.createuser(req.body);
  console.log(newUser);
  res.redirect("/home");
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
        res.redirect("/login");
      }
    });
  } else {
    res.redirect("/login");
  }
});

export default routerAuth;
