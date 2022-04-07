import apiProducts from "../../src/API/apiProducts.js";

export default async function configSocket(socket, sockets) {
  socket.emit("products", await apiProducts.listAll());
  socket.on("newProducts", async (product) => {
    await apiProducts.save(product);
    sockets.emit("products", await apiProducts.listAll());
  });
}
