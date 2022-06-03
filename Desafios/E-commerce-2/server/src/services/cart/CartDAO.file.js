import DAO from "../../classes/DAO.class.js";
import logger from "../../utils/logger.js";
import config from "../../utils/config";
import { promises as fs } from "fs";

class CartDAOFile extends DAO {
  constructor() {
    super();
    this.path = `${config.fileDB.path}/carts.json`;
  }
  async getAll() {
    try {
      const docs = await fs.readFile(this.path, "utf8");
      return JSON.parse(docs);
    } catch (error) {
      logger.error("Error getting all carts", error);
      return [];
    }
  }
  async getById(id) {
    try {
      const docs = await this.getAll();
      let doc = docs.find((item) => item.id == id);
      return doc;
    } catch (error) {
      logger.error("Error getting cart", error);
      return { error: `Error getting cart` };
    }
  }
  async save() {
    const docs = await this.getAll();
    let newId;
    if (docs.length === 0) {
      newId = 1;
    } else {
      newId = docs[docs.length - 1].id + 1;
    }
    const newObj = { id: newId };
    docs.push(newObj);

    try {
      await fs.writeFile(this.path, JSON.stringify(docs, null, 2));
      return docs;
    } catch (error) {
      logger.error("Error saving new cart");
      throw new Error(`Error saving new cart: ${error}`);
    }
  }
  async update(obj) {
    const docs = await this.getAll();
    const index = docs.findIndex((cart) => cart.id === obj.id);
    if (index == -1) {
      throw new Error("ID not found");
    } else {
      docs[index] = obj;
      try {
        await fs.writeFile(this.path, JSON.stringify(docs, null, 2));
      } catch (error) {
        throw new Error(`Error updating cart: ${error}`);
      }
    }
  }
  async deleteById(id) {
    const docs = await this.getAll();
    const index = docs.findIndex((cart) => cart.id === id);
    if (index == -1) {
      throw new Error("ID not found");
    } else {
      docs.splice(index, 1);
    }
    try {
      await fs.writeFile(this.path, JSON.stringify(docs, null, 2));
    } catch (error) {
      throw new Error(`Error deleting cart: ${error}`);
    }
  }
}

export default CartDAOFile;
