import express from "express";
import OrdersController from "../controllers/orders.controller.js";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuth,
} from "../auth/jwt.verify.js";

const router = express.Router();

class OrdersRouter {
  constructor() {
    this.controller = new OrdersController();
  }
  start() {
    router.get("/", verifyTokenAndAdmin, this.controller.getAllOrders);
    router.get("/:id", verifyTokenAndAuth, this.controller.getOrder);
    router.post("/", verifyToken, this.controller.saveOrder);
    router.put("/:id", verifyTokenAndAdmin, this.controller.updateOrder);
    router.delete("/:id", verifyTokenAndAdmin, this.controller.deleteOrder);
  }
}
export default OrdersRouter;
