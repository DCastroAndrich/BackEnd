const fs = require("fs");
//const Product = require("./product");
module.exports = class Contenedor {
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

      console.log(product.id);
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
      return items;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const contenido = await fs.promises.readFile(this.fileRoute, "utf-8");
      const arr = JSON.parse(contenido);
      //console.log(arr);
      return arr
      
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const contenido = await fs.promises.readFile(this.fileRoute, "utf-8");
      const arr = JSON.parse(contenido);
      const items = arr.filter((item) => item.id != id);

      await fs.promises.writeFile(
        this.fileRoute,
        JSON.stringify(items, null, 2)
      );

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
};

//const prueba = new Contenedor("./productos.txt");

//----TEST CON OBJETO MOCKEADO----

/* const prod1 = {
  name: "nombre de producto",
  price: "precio del producto",
  thumbnail: "url de imagen",
};
 */

//---TEST FINAL CON OBJETO DESDE CONTRUCTOR---

/* const prod1 = new Product(
  "Lapicera",
  50,
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWF_1EcjTutqM9l2oo73rBjM0KBAWiAgwMA&usqp=CAU "
);
const prod2 = new Product(
  "Lapiz",
  10,
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE3NN57EJPoYaRldy7Ia4oA3fS6RxUnjUGtg&usqp=CAU"
);
const prod3 = new Product(
  "Escuadra",
  25,
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTISAbbfPhCTceFZ6jsgK5NSLHhHnxVAHxETQ&usqp=CAU"
);
const prod4 = new Product(
  "Cuaderno",
  100,
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC7aZ4g4v0PPrJcaiQ-AesNiU95ZZEi_KejQ&usqp=CAU"
); */

//----TEST DE FUNCIONAMIENTO----

//prueba.save(prod1);
//prueba.save(prod2);
//prueba.save(prod3);

//prueba.save(prod4);

//prueba.getById(2);

//prueba.deleteById(1);

//prueba.getAll();

//prueba.deleteAll();
