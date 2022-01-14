const fs = require("fs");
module.exports = class Contenedor {
  fileRoute;

  constructor(fileRoute) {
    this.fileRoute = fileRoute;
  }
  getAll() {
    try {
      const contenido = fs.readFileSync(this.fileRoute, "utf-8");
      const arr = JSON.parse(contenido);
      //console.log(arr);
      return arr
      
    } catch (error) {
      console.log(error);
    }
  }
  
  getById(id) {
    try {
      const contenido = fs.readFileSync(this.fileRoute, "utf-8");
      const arr = JSON.parse(contenido);

      let items = arr.find((item) => item.id == id);

      console.log(items);
      return items;
    } catch (error) {
      console.log(error);
    }
  }

};

