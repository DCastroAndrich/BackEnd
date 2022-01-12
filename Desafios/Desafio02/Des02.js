const fs = require("fs");

class Contenedor {
  fileRoute;

  constructor(fileRoute) {
    this.fileRoute = fileRoute;
  }



  async save(product) {
    try {
      const contenido = await fs.promises.readFile(this.fileRoute, "utf-8");
      const arr = JSON.parse(contenido);
      const index = arr.length;
      product["id"] = index + 1;
      arr.push(product);

      await fs.promises.writeFile(this.fileRoute, JSON.stringify(arr, null, 2));

      console.log(arr);
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const contenido = await fs.promises.readFile(this.fileRoute, "utf-8");
      const arr = JSON.parse(contenido);

      let items = arr.find((item) => item.id == id);
      console.log(items);
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const contenido = await fs.promises.readFile(this.fileRoute, "utf-8");
      const arr = JSON.parse(contenido);
      console.log(arr);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const contenido = await fs.promises.readFile(this.fileRoute, "utf-8");
      const arr = JSON.parse(contenido);
      const items = arr.filter((item) => item.id != id);
      
      await fs.promises.writeFile(this.fileRoute, JSON.stringify(items, null, 2));

      
      console.log(items);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      const arr = [];
      await fs.promises.writeFile(this.fileRoute, JSON.stringify(arr, null, 2));
    } catch (error) {
      console.log(error);
    }
  }
}
const prueba = new Contenedor("./productos.txt");

const prod1 = {
  name: "nombre de producto",
  price: "precio del producto",
  thumbnail: "url de imagen",
};


//prueba.getById(3);
//prueba.save(prod1);

//prueba.getAll();
//prueba.deleteById(4);

//prueba.deleteAll();