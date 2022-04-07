import apiMessages from "../../src/API/apiMessages.js";

export default async function configSocket(socket, sockets) {
  socket.emit("messages", await apiMessages.listAll());

  socket.on("newMessages", async (msg) => {
    msg.date = new Date().toLocaleString();
    await apiMessages.save(msg);
    sockets.emit("messages", await apiMessages.listAll());
  });
}
