import express from "express";
import config from "./src/utils/config.js";
import cluster from "cluster";
import { cpus } from "os";
import logger from "./src/utils/logger.js";
import compression from "compression";
import cookieParser from "cookie-parser";
import connectMongo from "connect-mongo";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import path from "path";
import multer from "multer";
import { Router } from "express";
import cors from "cors";

const app = express();

const numCpus = cpus().length;
//const LocalStrategy = Strategy;
//const routerAuth = new Router();

/* MIDDLEWARES */
if (config.NODE_ENV == "development") app.use(cors());

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/* MONGO ATLAS */
const MongoStore = connectMongo.create({
  mongoUrl: config.mongodb.url,
  ttl: 60,
});

app.use(
  session({
    store: MongoStore,
    secret: config.mongodb.secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 6000 },
  })
);

// ==== PENDIENTE ACOMODAR EL FRONT DEL LOGIN

/* PASSPORT - SESSION - MULTER */

/* let strategy = new LocalStrategy(async (username, password, done) => {
  let user;
  try {
    user = await Users.findUser(username);
    if (!user) {
      return done(null, false, { message: "User not found" });
    }
  } catch (error) {
    return done(error);
  }
  let verifyPassword = bcrypt.compare(password, user[0].password);
  if (!verifyPassword) {
    return done(null, false, { message: "Invalid password" });
  }
  return done(null, user);
});

passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user[0].username);
});
passport.deserializeUser(async (username, done) => {
  try {
    let user = await Users.findUser(username);
    if (!user) {
      return done(new Error("User not found"));
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
}); */

/* LOGIN/REGISTER ROUTES */

/* routerAuth.get("/login", (req, res) => {
    const username = req.session.username;
    if (username) {
      res.redirect("/home");
    } else {
      res.render(path.join(process.cwd(), "/src/views/pages/login.ejs"));
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
    res.render(path.join(process.cwd(), "/src/views/pages/login-error.ejs"));
  }); */

// ==== REGISTER NEW USER ====

// ==== MULTER ====

/* const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/users");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()} - ${file.originalname}`);
    },
  });
  
  const upload = multer({ storage: storage });
  
  routerAuth.get("/register", (req, res) => {
    res.render(path.join(process.cwd(), "/src/views/pages/register.ejs"));
  });
  
  routerAuth.post("/register", upload.single("avatar"), async (req, res) => {
    const newUser = await Users.createuser(req.body);
    logger.info(newUser);
    res.redirect("/home");
  });
  
  // ==== LOGOUT CON SESSION ====
  routerAuth.get("/logout", (req, res) => {
    const username = req.session.username;
    if (username) {
      req.session.destroy((err) => {
        if (!err) {
          res.render(path.join(process.cwd(), "/src/views/pages/logout.ejs"), {
            username,
          });
        } else {
          res.redirect("/login");
        }
      });
    } else {
      res.redirect("/login");
    }
  }); */

/* ROUTES */

/* SERVIDOR */
const PORT = config.srv.PORT;

switch (config.srv.MODE) {
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
      const server = app.listen(PORT, () => {
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
    const server = app.listen(PORT, () => {
      logger.info(
        `Servidor express escuchado en puerto ${server.address().port}`
      );
    });

    server.on("error", (error) => logger.error(`Error en servidor ${error}`));
    break;
}
