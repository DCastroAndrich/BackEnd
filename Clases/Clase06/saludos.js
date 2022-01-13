const http = require("http");

const server = http.createServer((req, res) => {
    
    let dateMsg = new Date().getHours();
    

    if ( dateMsg >=6 && dateMsg <=12) {
        msg = "Buenos dias"

        res.end(msg);
    } else if (dateMsg>= 13 && dateMsg <=19) {
        msg = "Buenas tardes"

        res.end(msg);
    }else if (dateMsg>= 20 && dateMsg <=5) {
        msg = "Buenas Noches"

        res.end(msg)}


});

const connectedServer = server.listen(8080, () => {
  console.log(`Servidor UP en port ${connectedServer.address().port}`);
});