const express = require("express");
const app = express();
const products = [];

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", { products });
});

app.post("/productos", (req, res) => {
  products.push(req.body);
  console.log(products);
  res.redirect("/");
});

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor en puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
