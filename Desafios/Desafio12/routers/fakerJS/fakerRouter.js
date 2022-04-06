import { Router } from "express";
import { createProducts } from "../../src/mocks/productsMock.js";

const fakerRouter = new Router();

fakerRouter.get("/api/products-test", (req, res) => {
  res.json(createProducts(5));
});

export default fakerRouter;
