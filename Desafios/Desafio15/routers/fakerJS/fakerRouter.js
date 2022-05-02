import { Router } from "express";
import { createProducts } from "../../src/mocks/productsMock.js";
import logger from "../../logger.js";

const fakerRouter = new Router();

fakerRouter.get("/api/products-test", (req, res) => {
  looger.info("Accediendo a la ruta /api/products-test, método GET");

  res.json(createProducts(5));
});

export default fakerRouter;
