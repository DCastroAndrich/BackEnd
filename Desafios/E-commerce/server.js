/* MODULOS */

import "dotenv/config";
import express from "express";
import config from "./utils/config.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

import { Strategy } from "passport-local";
const LocalStrategy = Strategy;
import bcrypt from "bcrypt";
import { Router } from "express";
import path from "path";
import multer from "multer";
import UsersDAOMongoDB from "./containers/DAO's/users/UsersDAOMongoDB.js";
const Users = new UsersDAOMongoDB();

const routerAuth = new Router();

import cluster from "cluster";
import { cpus } from "os";
const numCpus = cpus().length;
import logger from "./utils/logger.js";

import connectMongo from "connect-mongo";

//import routerAuth from "./routes/routerAuth.js";
import routerProducts from "./routes/routerProducts.js";
import routerCart from "./routes/routerCart.js";
import routerHome from "./routes/routerHome.js";

/* INSTANCIACION */
const app = express();

/* MIDDLEWARES */

// ==== Motor de Plantillas ====
app.set("view engine", "ejs");

// ==== gzip ====
app.use(compression());

// ==== Mongo Atlas Session ====

const MongoStore = connectMongo.create({
  mongoUrl: config.mongodb.url,
  ttl: 60,
});

app.use(
  session({
    store: MongoStore,
    secret: "123456789!#$%&/",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
);

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
    let user;
    try {
      user = await Users.findUser(username, (error, doc) => {
        if (error === "error") {
          return done(error);
        }
      });
    } catch (error) {
      console.error(error);
    }
    const verifyPassword = bcrypt.compare(password, doc.password);
    if (!verifyPassword) {
      return null, false;
    }
    return done(null, user);
  })
); */

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

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan("tiny"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

routerProducts.use(bodyParser.json());
routerCart.use(bodyParser.json());
routerAuth.use(bodyParser.json());
routerHome.use(bodyParser.json());

/* RUTAS */
app.use("/", routerAuth);
app.use("/home", routerHome);
app.use("/api/productos/", routerProducts);
app.use("/api/carrito/", routerCart);

app.get("/*", (req, res) => {
  res.status(400).json({
    msg: "error : -2, descripcion: ruta 'x' método 'y' no implementada",
  });
});

/* SERVIDOR */

switch (config.MODE) {
  case "CLUSTER":
    if (cluster.isPrimary) {
      logger.info("CPUs:", numCpus);
      for (let i = 0; i < numCpus; i++) {
        cluster.fork();
      }

      cluster.on("exit", (worker) => {
        logger.info(
          `Worker ${worker.process.pid} finalizo ${new Date().toLocaleString()}`
        );
        cluster.fork();
      });
    } else {
      const server = app.listen(config.PORT, () => {
        logger.info(
          `Servidor express escuchado en puerto ${
            server.address().port
          } - PID ${process.pid} - ${new Date().toLocaleString()}`
        );
      });
      server.on("error", (error) => logger.error(`Error en servidor ${error}`));
    }

    break;

  default:
    const server = app.listen(config.PORT, () => {
      logger.info(
        `Servidor express escuchado en puerto ${server.address().port}`
      );
    });

    server.on("error", (error) => logger.error(`Error en servidor ${error}`));
    break;
}
