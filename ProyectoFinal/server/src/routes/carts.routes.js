import express from "express";
import CartsController from "../controllers/carts.controller.js";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuth,
} from "../auth/jwt.verify.js";

const router = express.Router();

class CartsRouter {
  constructor() {
    this.controller = new CartsController();
  }
  start() {
    router.get("/", verifyTokenAndAdmin, this.controller.getAllCarts);
    router.get("/:id", verifyTokenAndAuth, this.controller.getCart);
    router.post("/", verifyToken, this.controller.saveCart);
    router.put("/:id", verifyTokenAndAuth, this.controller.updateCart);
    router.delete("/:id", verifyTokenAndAuth, this.controller.deleteCart);
    return router;
  }
}

export default CartsRouter;
