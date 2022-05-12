/* MODULOS */

import "dotenv/config";
import express from "express";
import config from "./utils/config.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import session from "express-session";
import bcrypt from "bcrypt"

import connectMongo from "connect-mongo";

import passport from "passport";
import { Strategy } from "passport-local";
const LocalStrategy = Strategy;

import UsersDAOMongoDB from "./containers/DAO's/users/UsersDAOMongoDB.js";
const Users = new UsersDAOMongoDB();

import routerProducts from "./routes/routerProducts.js";
import routerCart from "./routes/routerCart.js";

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

// ==== Passport Local ====

passport.use("login",new LocalStrategy(async (username, password, done) => {
    
    const user = await Users.findUser(username, (error, doc)=>{
      if(error === "error"){return done(error)}
      const verifyPassword = await bcrypt.compare(password, doc.password)
      if (!verifyPassword) {return (null, false)}
      return done(null, user)

    })
   
  })
);

app.use(morgan("tiny"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

routerProducts.use(bodyParser.json());
routerCart.use(bodyParser.json());

/* RUTAS */

app.use("/api/productos/", routerProducts);
app.use("/api/carrito/", routerCart);

app.get("/*", (req, res) => {
  res.status(400).json({
    msg: "error : -2, descripcion: ruta 'x' método 'y' no implementada",
  });
});

/* SERVIDOR */

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor en puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
