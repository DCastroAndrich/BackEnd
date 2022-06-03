import CustomError from "../../classes/CustomError.class.js";
import DAO from "../../classes/DAO.class.js";
import logger from "../../utils/logger.js";

class CartDAOMem extends DAO {
  constructor() {
    super();
    this.collection = [];
  }

  getAll() {
    let docs = [];
    try {
      docs = this.collection;
      return docs;
    } catch (error) {
      const err = new CustomError(500, "Error getting all carts", error);
      logger.error(err);
      throw err;
    } finally {
      logger.info(`${docs.length} carts found`);
    }
  }

  getById(id) {
    let doc = null;

    try {
      doc = this.collection.find((doc) => {
        return doc.id === id;
      });
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error getting cart", error);
      logger.error(err);
      throw err;
    } finally {
      logger.info(`${JSON.stringify(doc)} cart found`);
    }
  }

  save() {
    let doc = null;
    try {
      let newId;
      if (this.collection.length == 0) {
        newId = 1;
      } else {
        newId = this.collection[this.collection.length - 1].id + 1;
      }
      doc = { id: newId, products: [] };
      this.collection.push(doc);
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error saving new cart", error);
      logger.error(err);
      throw err;
    } finally {
      logger.info(`New cart saved successfully: ${JSON.stringify(doc)}`);
    }
  }

  update(obj) {
    let doc = null;
    try {
      const index = this.collection.findIndex((cart) => cart.id === obj.id);
      if (index == -1) {
        doc = { code: 401, msg: "ID not found" };
      } else {
        this.collection[index] = obj;
        doc = this.collection[index];
      }
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error updating cart", error);
      logger.error(err);
      throw err;
    } finally {
      logger.info(`Cart updated: ${JSON.stringify(doc)}`);
    }
  }
  deleteById(id) {
    let doc = null;
    try {
      const index = this.collection.findIndex((cart) => cart.id == id);
      if (id == -1) {
        doc = { code: 401, msg: "ID not found" };
      } else {
        doc = this.collection.splice(index, 1);
      }
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error deleting cart", error);
      logger.error(err);
      throw err;
    } finally {
      logger.info(`Cart deleted: ${JSON.stringify(doc)}`);
    }
  }
}

export default CartDAOMem;
