//------- MODULOS -------
const express = require("express");
const bodyParser = require("body-parser");
const exhbs = require("express-handlebars");
const path = require("path");

const products = [];
//--------- INSTANCIACION ---------
const app = express();

//-------- MIDDLEWARES ---------
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//-------- MOTOR PLANTILLA HBS ---------

app.set("views", path.join(__dirname, "views"));

app.engine(
  "hbs",
  exhbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialDir: path.join(app.get("views"), "partials"),
    extname: "hbs",
  })
);

app.set('view engine', 'hbs')

//------- RUTAS --------

app.get("/", (req, res) => {
  res.render("home", { products });
});

app.post("/productos", (req, res) => {
  products.push(req.body);
  console.log(products);
  res.redirect("/");
});


//---------- SERVIDOR ----------
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor en puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
