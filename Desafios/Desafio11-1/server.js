/* MODULOS */

import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongo from "connect-mongo";
import config from "./config.js";

import passport from "passport";
import { Strategy } from "passport-facebook";

import wsProducts from "./routers/websocket/wsProducts.js";
import wsMessages from "./routers/websocket/wsMessages.js";

import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";

import homeRouter from "./routers/web/homeRouter.js";
import authRouter from "./routers/web/authRouter.js";
import fakerRouter from "./routers/fakerJS/fakerRouter.js";

/* INSTANCIACION */

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const FacebookStrategy = Strategy;

/* MIDDLEWARES */

//------ Passport ----------

passport.use(
  new FacebookStrategy(
    {
      clientID: config.facebookApp.FACEBOOK_APP_ID,
      clientSecret: config.facebookApp.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:8282/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos"],
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("accessToken", accessToken);
      console.log("refreshToken", refreshToken);
      console.log(profile);
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

app.use(passport.initialize())
app.use(passport.session())

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



/* WEBSOCKET */

io.on("connection", async (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);
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
const server = httpServer.listen(config.PORT, () => {
  console.log(`Servidor HTTP escuchado en puerto ${server.address().port}`);
});

server.on("error", (error) => console.error(`Error en servidor ${error}`));
