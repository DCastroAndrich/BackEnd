//----SERVIDOR EN EXPRESS----
const express = require('express');
const moment = require('moment')
const app = express()


const PORT = 8080;


//----CREACION DE ENDPOINTS-----


app.get('/', (req, res)=> {
    res.send("<h1 style='color:blue;'>Bienvenidos al servidor express</h1>")
})

let visitas = 0;


app.get('/visitas', (req, res)=> {
    
    visitas++;
    res.send(`<h1 style='color:blue;'>Cantidad de visitas: ${visitas}</h1>`)
})
app.get('/fyh', (req, res)=> {
    
    let date = moment(new Date()).format('DD/MM/ YYYY')
    res.send(`<h1 style='color:blue;'>El dia de hoy es: ${date}</h1>`)
})

const server = app.listen(PORT, ()=>{
    console.log(`Servidor EXPRESS UP en puerto ${server.address().port}`);
})


server.on("error", error => console.log(`Error en servidor ${error}`))
