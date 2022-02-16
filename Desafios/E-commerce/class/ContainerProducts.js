const { promises: fs } = require("fs");

class ContainerProducts {
  fileroute;
  constructor(fileroute) {
    this.fileroute = fileroute;
  }

  async getAll() {
    try {
      const content = await fs.readFile(this.fileroute, "utf8");
      const arr = JSON.parse(content);
      return arr;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getById(id) {
    try {
      const content = await this.getAll();
      let product = content.find((item) => item.id == id);

      return product;
    } catch (error) {
      console.error(error);
      return { error: `Producto no encontrado` };
    }
  }

  async save(product) {
    const content = await this.getAll();
    let newId;
    if (content.length === 0) {
      newId = 1;
    } else {
      newId = content[content.length - 1].id + 1;
    }

    const newProduct = {
      id: newId,
      timestamp: Date().toLocaleString(),
      name: product.name,
      description: product.description,
      thumbnail: product.thumbnail,
      price: product.price,
      stock: product.stock,
    };
    content.push(newProduct);

    try {
      await fs.writeFile(this.fileroute, JSON.stringify(content, null, 2));
      return newId;
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async update(product, id) {
    const content = await this.getAll();
    const updatedProduct = { id: Number(id), ...product };
    let prods = content.find((item) => item.id == id);
    if (prods == -1) {
      throw new Error(`Error al modificar. Id ${id} no encontrado`);
    } else {
      content[id] = updatedProduct;
      try {
        await fs.writeFile(this.fileroute, JSON.stringify(content, null, 2));
      } catch (error) {
        throw new Error(`Error al modificar: ${error}`);
      }
    }
  }

  async deleteById(id) {
    const content = await this.getAll();
    const prod = content.filter((item) => item.id != id);
    try {
      await fs.writeFile(this.fileroute, JSON.stringify(prod, null, 2));
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }
}
module.exports = ContainerProducts;
