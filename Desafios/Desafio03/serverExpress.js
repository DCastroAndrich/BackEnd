const express = require("express");
const Contenedor = require("./container/container.js");

const app = express();

const PORT = 8080;

let obj = new Contenedor("./container/productos.txt");

let productsArr = obj.getAll();


app.get("/", (req, res) => {
  res.send(
    "<h1 style='color:orange; text-decoration:underline;' >Bienvenidos al primer servidor de DCastroAndrich</h1>"
  );
});

app.get("/productos", (req, res) => {
  let msg = productsArr;

  res.send({ msg });

  console.log(msg);
});

app.get("/productoRandom", (req, res) => {
    
   let num = Math.floor((Math.random() * 99) + 1)

  

  res.send();
});

const server = app.listen(PORT, () => {
  console.log(
    `Servidor EXPRESS escuchado en el puerto ${server.address().port}`
  );
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
