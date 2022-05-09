import express from "express";
const routerProducts = express.Router();
const admin = true;


import { DAOProducts } from "../containers/DAO's/imports.js";

const apiProducts = new DAOProducts();

routerProducts.get("/", async (req, res) => {
  const response = await apiProducts.getAll();
  res.send(response);
});
routerProducts.get("/:id", async (req, res) => {
  const response = await apiProducts.getById(req.params.id);

  res.status(200).send(response);
});

routerProducts.post("/", async (req, res) => {
  if (admin === true) {
    const response = await apiProducts.save(req.body);
    res
      .status(200)
      .send({ msg: "Producto agregado satisfactoriamente!", data: response });
  } else {
    res.status(400).json({
      msg: "error: -1, descripcion: ruta '/' método 'POST' no autorizada",
    });
  }
});

routerProducts.put("/:id", async (req, res) => {
  const product = {
    name: req.body.name,
    description: req.body.description,
    thumbnail: req.body.thumbnail,
    price: req.body.price,
    stock: req.body.stock,
  };
  if (admin === true) {
    const response = await apiProducts.update(product, req.params.id);
    res
      .status(200)
      .send({ msg: "Producto modificado exitosamente!", data: response });
  } else {
    res.status(400).json({
      msg: "error: -1, descripcion: ruta '/:id' método 'PUT' no autorizada",
    });
  }
});

routerProducts.delete("/:id", async (req, res) => {
  if (admin === true) {
    const response = await apiProducts.deleteById(req.params.id);
    res.status(200).send({ msg: "Producto eliminado", data: response });
  } else {
    res.status(400).json({
      msg: "error: -1, descripcion: ruta '/:id' método 'DELETE' no autorizada",
    });
  }
});

export default routerProducts;
