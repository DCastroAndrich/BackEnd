//------- MODULOS -------
const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

//--------- INSTANCIACION ---------
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//-------- MIDDLEWARES ---------
app.use(express.static("public"));

//----------- WEBSOCKET ----------
const messages = [];

io.on("connection", (socket) => {
  console.log(`Nuevo cliente conectado  ${socket.id}`);

  //-------- Enviar historico de mensaje
  socket.emit("messages", messages);

  //--------- Escuchar los nuevos mensajes

  socket.on("newMsg", (data) => {
    messages.push(data);
    //------- Actualizacion de la vista

    io.sockets.emit("messages", messages);
  });
});

//------- RUTAS --------

//---------- SERVIDOR ----------
const PORT = 8080;

const server = httpServer.listen(PORT, () => {
  console.log(`Servidor en puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
