const express = require("express");
const routerCart = express.Router();

const ContainerCart = require("../class/ContainerCart");

const apiCart = new ContainerCart("./cart.json");

routerCart.get("/", async (req, res) => {
  const response = await apiCart.getAll();
  res.status(200).send({ msg: "Carritos", data: response });
});
routerCart.post("/", async (req, res) => {
  const response = await apiCart.newCart();
  res.status(200).send({ msg: "Nuevo carrito creado", ID: response });
});

routerCart.delete("/:id", async (req, res) => {
  const response = await apiCart.eraseById(req.params.id);
  res.status(200).send({ msg: "Carrito eliminado", data: response });
});

routerCart.get("/:id/productos", async (req, res) => {
  const response = await apiCart.listById(req.params.id);
  res.status(200).send({ msg: "Productos en el carrito", data: response });
});

routerCart.post("/:id/productos/:id_prod", async (req, res) => {
  const response = await apiCart.saveToCart(req.params.id, req.params.id_prod);
  res.status(200).send({ msg: "Producto agregado al carrito", data: response });
});

routerCart.delete("/:id/productos/:id_prod", async (req, res) => {
  const response = await apiCart.eraseFromCart(req.params.id, req.params.id_prod);
  res
    .status(200)
    .send({ msg: "Producto eliminado del carrito", data: response });
});

module.exports = routerCart;
