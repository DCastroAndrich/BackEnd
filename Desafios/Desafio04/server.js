//------- MODULOS -------
const express = require("express");
const bodyParser = require("body-parser");
const routerProducts = require("./routes/products");

//--------- INSTANCIACION ---------
const app = express();

//-------- MIDDLEWARES ---------
app.use('/api/productos' ,express.static('public'))
routerProducts.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

//------- RUTAS --------

app.use("/api/productos", routerProducts);

//---------- SERVIDOR ----------
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor en puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
