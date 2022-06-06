import express from "express";
const router = express.Router();

import ProductController from "../controllers/product.controller.js";

class ProductRouter {
  constructor() {
    this.controller = new ProductController();
  }

  start() {
    router.get("/", this.controller.getAllProducts);

    router.get("/:id", this.controller.getProduct);

    router.post("/", this.controller.saveProduct);

    router.put("/:id", this.controller.updateProduct);

    router.delete("/:id", this.controller.deleteProduct);

    return router;
  }
}

export default ProductRouter;
