import express from "express";
import { verifyTokenAndAdmin } from "../auth/jwt.verify.js";
import ProductsController from "../controllers/products.controller.js";

const router = express.Router();

class ProductsRouter {
  constructor() {
    this.controller = new ProductsController();
  }

  start() {
    router.get("/", this.controller.getAllProducts);
    router.get("/:id", this.controller.getProduct);
    router.post("/", verifyTokenAndAdmin, this.controller.saveProduct);
    router.put("/:id", verifyTokenAndAdmin, this.controller.updateProduct);
    router.delete("/:id", verifyTokenAndAdmin, this.controller.deleteProduct);
    return router;
  }
}

export default ProductsRouter;
