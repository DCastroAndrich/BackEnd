const { promises: fs } = require("fs");

class ContainerCart {
  fileroute;
  constructor(fileroute) {
    this.fileroute = fileroute;
  }

  async getAll() {
    try {
      const content = await fs.readFile(this.fileroute, "utf-8");
      const arr = JSON.parse(content);
      return arr;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async newCart() {
    const content = await this.getAll();
    let newId;
    if (content.length === 0) {
      newId = 1;
    } else {
      newId = content[content.length - 1].id + 1;
    }

    const newCart = {
      id: newId,
      timestamp: Date().toLocaleString(),
      products: [],
    };

    content.push(newCart);

    try {
      await fs.writeFile(this.fileroute, JSON.stringify(content, null, 2));
      return newId;
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async eraseById(id) {
    const content = await this.getAll();
    const cart = content.filter((cart) => cart.id != id);

    try {
      await fs.writeFile(this.fileroute, JSON.stringify(cart, null, 2));
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async listById(id) {
    try {
      const content = await this.getAll();
      const carts = content.find((cart) => cart.id == id);

      return carts.products;
    } catch (error) {
      console.error(error);
      return { error: `Carrito no encontrado` };
    }
  }

  async saveToCart(id, id_prod) {
    const content = await this.getAll();
    const carts = content.find((cart) => cart.id == id);

    const productsJSON = await fs.readFile("./products.json", "utf-8");
    const arr = JSON.parse(productsJSON);

    const items = arr.find((item) => item.id == id_prod);

    const itemsObj = { ...items };

    carts.products.push(itemsObj);

    try {
      await fs.writeFile(this.fileroute, JSON.stringify(content, null, 2));
      return carts.products;
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async eraseFromCart(id, id_prod) {
    const content = await this.getAll();
    const carts = content.find((cart) => cart.id == id);
    const items = carts.products.find((item) => item.id == id_prod);
    const index = carts["products"].indexOf(items)
    carts["products"].splice(index, 1)

    try {
      await fs.writeFile(this.fileroute, JSON.stringify(content, null, 2));
      return carts.products;
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }
}
module.exports = ContainerCart;
