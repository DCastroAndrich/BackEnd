import express from "express";
const router = express.Router();

import CartController from "../controllers/cart.controller.js";

class CartRouter {
  contructor() {
    this.controller = new CartController();
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

export default CartRouter;
