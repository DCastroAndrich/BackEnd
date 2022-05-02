/* MODULOS */
import "dotenv/config";

import express from "express";
import compression from "compression";
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongo from "connect-mongo";
import config from "./config.js";

import cluster from "cluster";
import { cpus } from "os";

import passport from "passport";
import { Strategy } from "passport-facebook";

import wsProducts from "./routers/websocket/wsProducts.js";
import wsMessages from "./routers/websocket/wsMessages.js";

import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";

import homeRouter from "./routers/web/homeRouter.js";
import authRouter from "./routers/web/authRouter.js";
import fakerRouter from "./routers/fakerJS/fakerRouter.js";
import logger from "./logger.js";

/* INSTANCIACION */

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const FacebookStrategy = Strategy;

const numCpus = cpus().length;

/* MIDDLEWARES */

//------- gzip -------------

app.use(compression());

//------ Passport ----------

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:8282/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      logger.info("accessToken", accessToken);
      logger.info("refreshToken", refreshToken);
      logger.info(profile);
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

//-------- Motor de plantilla--------

app.set("view engine", "ejs");

//--------- Mongo ------------
const MongoStore = mongo.create({
  mongoUrl: config.mongo.url,
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

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/* WEBSOCKET */

io.on("connection", async (socket) => {
  logger.info(`Nuevo cliente conectado ${socket.id}`);
  wsProducts(socket, io.sockets);
  wsMessages(socket, io.sockets);
});

/* ROUTES */
//-----Ruta a los productos de Faker.js
app.use(fakerRouter);

//-----Ruta a las vistas del servidor
app.use(authRouter);
app.use(homeRouter);

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
      const server = httpServer.listen(config.PORT, () => {
        logger.info(
          `Servidor HTTP escuchado en puerto ${server.address().port} - PID ${
            process.pid
          } - ${new Date().toLocaleString()}`
        );
      });
      server.on("error", (error) => logger.error(`Error en servidor ${error}`));
    }

    break;

  default:
    const server = httpServer.listen(config.PORT, () => {
      logger.info(`Servidor HTTP escuchado en puerto ${server.address().port}`);
    });

    server.on("error", (error) => logger.error(`Error en servidor ${error}`));
    break;
}
