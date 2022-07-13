import express from "express";
const router = express.Router();

import CartsController from "../controllers/carts.controller.js";

class CartsRouter {
  contructor() {
    this.controller = new CartsController();
  }
  start() {
    router.get("/", this.controller.getAllCarts);
    router.get("/:id/productos", this.controller.getCart);
    router.post("/", this.controller.saveCart);
    router.put("/:id/productos/:id_prod", this.controller.updateCart);
    router.delete("/:id", this.controller.deleteCart);
    router.delete("/:id/productos/:id_prod", this.controller.deleteFromCart);
    return router;
  }
}

export default CartsRouter;
