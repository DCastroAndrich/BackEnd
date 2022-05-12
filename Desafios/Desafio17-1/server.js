/* MODULOS */

import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

import routerProducts from "./routes/routerProducts.js";
import routerCart from "./routes/routerCart.js";

/* INSTANCIACION */
const app = express();

/* MIDDLEWARES */
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
routerProducts.use(bodyParser.json());
routerCart.use(bodyParser.json());

/* RUTAS */

app.use("/api/productos/", routerProducts);
app.use("/api/carrito/", routerCart);

app.get("/*", (req, res) => {
  res.status(400).json({
    msg: "error : -2, descripcion: ruta 'x' método 'y' no implementada",
  });
});

/* SERVIDOR */

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor en puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
