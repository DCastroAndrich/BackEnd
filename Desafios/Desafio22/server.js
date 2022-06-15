import express from "express";
import { graphqlHTTP } from "express-graphql";

import ProductController from "./src/controllers/Product.controller.js";
import ProductSchema from "./src/graphql/Product.schema.js";

const app = express();

app.use(express.static("public"));

app.use(
  "/graphql/products",
  graphqlHTTP({
    schema: ProductSchema,
    rootValue: {
      getProducts: ProductController.getProducts,
      createProduct: ProductController.createProduct,
      updateProduct: ProductController.updateProduct,
      deleteProduct: ProductController.deleteProduct,
    },
    graphiql: true,
  })
);

const PORT = 6060;

const server = app.listen(PORT, () => {
  console.log(`Servidor express escuchado en puerto ${server.address().port}`);
});
server.on("error", (error) => console.error(`Error en servidor ${error}`));
