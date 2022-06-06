import DAO from "../../classes/DAO.class.js";
import logger from "../../utils/logger.js";
import config from "../../utils/config.js";
import { promises as fs } from "fs";

class ProductDAOFile extends DAO {
  constructor() {
    super();
    this.path = `${config.fileDB.path}/products.json`;
  }

  async getAll() {
    try {
      const docs = await fs.readFile(this.path, "utf8");
      return JSON.parse(docs);
    } catch (error) {
      logger.error("Error getting all products", error);
      return [];
    }
  }

  async getById(id) {
    try {
      const docs = await this.getAll();
      let doc = docs.find((item) => item.id == id);
      return doc;
    } catch (error) {
      logger.error("Error getting product", error);
      return { error: `Error getting product` };
    }
  }

  async save(obj) {
    const docs = await this.getAll();
    let newId;
    if (docs.length === 0) {
      newId = 1;
    } else {
      newId = docs[docs.length - 1].id + 1;
    }
    const newObj = { ...obj, id: newId };
    docs.push(newObj);

    try {
      await fs.writeFile(this.path, JSON.stringify(docs, null, 2));
      return docs;
    } catch (error) {
      logger.error("Error saving new product");
      throw new Error(`Error saving new product: ${error}`);
    }
  }

  async update(obj) {
    const docs = await this.getAll();
    const index = docs.findIndex((product) => product.id === obj.id);
    if (index == -1) {
      throw new Error("ID not found");
    } else {
      docs[index] = obj;
      try {
        await fs.writeFile(this.path, JSON.stringify(docs, null, 2));
      } catch (error) {
        throw new Error(`Error updating product: ${error}`);
      }
    }
  }

  async deleteById(id) {
    const docs = await this.getAll();
    const index = docs.findIndex((product) => product.id === id);
    if (index == -1) {
      throw new Error("ID not found");
    } else {
      docs.splice(index, 1);
    }
    try {
      await fs.writeFile(this.path, JSON.stringify(docs, null, 2));
    } catch (error) {
      throw new Error(`Error deleting product: ${error}`);
    }
  }
}

export default ProductDAOFile;
