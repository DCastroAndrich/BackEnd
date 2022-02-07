const express = require("express");
const app = express();

const PORT = 5522;

const frase = "Hola mundo cómo están";

const palabras = frase.split(' ')

const letras = palabras.join('');

//const expresionRegular = /\s*;\s*/;

app.get("/api/frase", (req, res) => {
  res.send(`<h1>${frase}</h1>`);
});

app.get("/api/letras/:num", (req, res) => {
  
    const num = parseInt(req.params.num)
    


    res.send(`<h1>${frase}</h1>`);
});


//FALTA TERMINAR LOS EJERCICIOS EN CLASE




const server = app.listen(PORT, () => {
  console.log(`Servidor escuchado en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
