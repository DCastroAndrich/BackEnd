/* MODULOS */

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const routerProducts = require("./routes/routerProducts");
const routerCart = require("./routes/routerCart");

/* INSTANCIACION */
const app = express();

const admin = false;


/* MIDDLEWARES */
app.use(morgan("tiny"));
routerProducts.use(express.json());
routerCart.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* RUTAS */

app.use("api/productos", routerProducts);
app.use("api/carrito", routerCart);

/* SERVIDOR */

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor en puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
