import express from "express";
const router = express.Router();

import CartController from "../controllers/cart.controller.js";

class CartRouter {
  constructor() {
    this.controller = new CartController();
  }

  start() {
    router.get("/", this.controller.getAllCarts);

    router.get("/:id/products", this.controller.getCart);

    router.post("/", this.controller.saveCart);

    router.put("/:id/products/:id_prod", this.controller.updateCart);

    router.delete("/:id", this.controller.deleteCart);

    router.delete("/:id/products/:id_prod", this.controller.deleteFromCart);

    return router;
  }
}

export default CartRouter;
