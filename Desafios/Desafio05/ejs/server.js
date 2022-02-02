//------- MODULOS -------
const express = require("express");
const ejs = require("ejs");

const products = [];
//--------- INSTANCIACION ---------
const app = express();

//-------- MIDDLEWARES ---------
app.use(express.urlencoded({extended: true}))
app.set('views', './views')
app.set('view engine', 'ejs')


//------- RUTAS --------

app.get("/", (req, res)=>{
    res.render("inicio", {products})
})


app.post("/productos", (req, res)=>{
    products.push(req.body)
    console.log(products)
    res.redirect("/")
})


//---------- SERVIDOR ----------
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor en puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
