/* MODULOS */
const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const Container = require("./src/containers/Container");


/* INSTANCIACION */
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const apiProducts = new Container("./src/utils/optionsMySQL.js", "products");
const apiMessages = new Container("./src/utils/optionsSQLite.js", "messages");

/* MIDDLEWARES */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/* WEBSOCKET */
io.on("connection", (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);
  //------- Enviar histórico de productos
  socket.emit("products", apiProducts.listAll());

  //------- Escuchar nuevos productos
  socket.on("newProduct", (product) => {
    apiProducts.save(product);

    //Actualización de la vista de productos
    io.sockets.emit("products", apiProducts.listAll());
  });

  //------- Enviar histórico de mensajes
  socket.emit("messages", apiMessages.getAll());

  //------- Escuchar nuevos mensajes
  socket.on("newMessage", (msg) => {
    msg.date = new Date().toLocaleString();
    apiMessages.save(msg);

    //Actualización de la vista de mensajes
    io.sockets.emit("messages", apiMessages.getAll());
  });
});

/* SERVIDOR */
const PORT = 8080;
const server = httpServer.listen(PORT, () => {
  console.log(`Servidor http escuchado en puerto ${server.address().port}`);
});
server.on("error", (error) => console.error(`Error en servidor ${error}`));
