//----------MODULES------------
const express = require("express");
const routMascota = express.Router();
const routPersona = express.Router();


//--------- INSTANCIACION DE EXPRESS -------------
const app = express();


//---------- ROUTES ----------









const PORT = 7777;

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en ${PORT}`);
});

server.on("error", (error) => {
  console.error(`Error en servidor ${error}`);
});






//EX01:
//