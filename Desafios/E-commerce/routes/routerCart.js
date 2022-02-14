const express = require("express");
const routerCart = express.Router();

const CartContainer = require("../class/ContainerCart");

const apiCart = new CartContainer("../cart.json")


routerCart.post("/", (req, res) => {
  /* Falta logica */
});

routerCart.delete("/:id", (req, res)=>{
    /* Falta logica del carrito */
})

routerCart.get("/:id/productos", (req, res)=>{
    apiCart.getAll()
})


routerCart.post("/:id/productos", (req, res)=>{

})
