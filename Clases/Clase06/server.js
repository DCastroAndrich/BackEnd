//----SERVIDOR EN HTTP-----

const http = require("http");

const server = http.createServer((req, res) => {

//----CREACION DE ENDPOINTS----
    if (req.url == "/") {
        let msg = "Home"
        res.end(msg);
    } else if (req.url == "/segundo") {
        
        res.end("Segunda parte");
    }

});

const connectedServer = server.listen(8080, () => {
  console.log(`Servidor UP en port ${connectedServer.address().port}`);
});
