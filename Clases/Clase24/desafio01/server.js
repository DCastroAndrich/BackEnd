import express from "express";
import session from "express-session";
import bodyParser from "body-parser";



const app = express();



/* MIDDLEWARES */

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())


/* RUTAS */

app.get("/", (req, res)=>{
    res.redirect("/login")
})

app.get("/login", (req, res)=>{
    res.render("login")
})



/* SERVIDOR */


const PORT = 4040;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchado en ${PORT}`);
})

server.on("error", error =>{
    console.error(`Error en servidor ${PORT}`);
})