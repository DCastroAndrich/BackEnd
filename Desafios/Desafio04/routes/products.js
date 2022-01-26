const express = require("express");
const routerProducts = express.Router();

let products = [];
let index = 1;

routerProducts.get("/", (req, res) => {
  res.status(200).json(products);
});

routerProducts.post("/", (req, res) => {
  /* const index = products.length;

  let product = {
    title: req.body.title,
    price: req.body.price,
  };

  product["id"] = index + 1;
 */

if (products.length > 0) {
    index = products[products.length-1].id +1
    products = [...products, {...req.body, id: index}]

} else {
    products = [{...req.body, id: index}]   
}


  //products.push();

  res
    .status(200)
    .json({ msg: "Producto agregado exitosamente!", data: products });
});

routerProducts.get("/:id", (req, res) => {
  let items = products.find((item) => item.id == req.params.id);

  if (items === undefined) {
    res.status(400).json({ error: "Producto no encontrado" });
  } else {
    res.status(200).json({ items });
  }
});

routerProducts.delete("/:id", (req, res) => {
  let items = products.find((item) => item.id == req.params.id);

  let i = products.indexOf(items);

  products.splice(i, 1);
  res.status(200).json({ msg: "Producto eliminado", items });
});

routerProducts.put("/:id", (req, res) => {
  let items = products.find((item) => item.id == req.params.id);

    items.title = req.body.title;
    items.price = req.body.price;
  
    res.status(200).json({ msg: "Producto modificado" });
  
});

module.exports = routerProducts;
