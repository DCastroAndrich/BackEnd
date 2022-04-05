/* MODULOS */

import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import mongo from "connect-mongo";
import config from "./config";

import wsProducts from "./routers/websocket/wsProducts.js";
import wsMessages from "./routers/websocket/wsMessages.js";

import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";

/* INSTANCIACION */

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

/* MIDDLEWARES */

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

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

/* WEBSOCKET */

io.on("connection", async (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);
  wsProducts(socket, io.sockets);
  wsMessages(socket, io.sockets);
});

/* SERVIDOR */
const server = httpServer.listen(config.PORT, () => {
  console.log(`Servidor HTTP escuchado en puerto ${server.address().port}`);
});

server.on("error", (error) => console.error(`Error en servidor ${error}`));
