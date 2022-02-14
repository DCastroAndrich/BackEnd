const express = require("express");
const routerProducts = express.Router();

const ProductsContainer = require("../class/ContainerProducts");

const apiProducts = new ProductsContainer("../products.json")

routerProducts.get("/:id?", (req, res) => {
  apiProducts.getById(req.params.id);
});

routerProducts.post("/", (req, res) => {
  if (admin === true) {
    apiProducts.save(req.body);
  } else {
    return { error: `error: -1, descripcion: ruta '/' método 'POST' no autorizada` };
  }
});

routerProducts.put("/:id", (req, res) => {
  if (admin === true) {
    apiProducts.update(req.body, req.params.id);
  } else {
    return { error: `error: -1, descripcion: ruta '/:id' método 'PUT' no autorizada` };
  }
});

routerProducts.delete("/:id", (req, res) => {
  if (admin === true) {
    apiProducts.deleteById(req.params.id);
  } else {
    return { error: `error: -1, descripcion: ruta '/:id' método 'DELETE' no autorizada` };
  }
});

module.exports = routerProducts;
