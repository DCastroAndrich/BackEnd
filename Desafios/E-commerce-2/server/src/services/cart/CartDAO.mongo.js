import CustomError from "../../classes/CustomError.class.js";
import DAO from "../../classes/DAO.class.js";
import logger from "../../utils/logger.js";
import CartModel from "../../models/Cart.model.js";
import MongoAtlasClient from "../../classes/MongoAtlasClient.class.js";

class CartDAOMongo extends DAO {
  constructor() {
    this.collection = CartModel;
    this.conn = new MongoAtlasClient();
  }

  async getAll() {
    let docs = [];
    try {
      await this.conn.connect();
      docs = await this.collection.find({});
      logger.info(docs);
      return docs;
    } catch (error) {
      const err = new CustomError(500, "Error getting all carts", error);
      logger.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
      logger.info(`${docs.length} carts found`);
    }
  }

  async getById(id) {
    let doc = null;

    try {
      await this.conn.connect();
      doc = await this.collection.find({ _id: id });
      logger.info(doc);
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error getting cart", error);
      logger.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
      logger.info(`${JSON.stringify(doc)} cart found`);
    }
  }

  async save() {
    let doc = null;
    try {
      await this.conn.connect();
      doc = await this.collection.save();
      logger.info(doc);
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error saving new cart", error);
      logger.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
      logger.info(`New cart saved successfully: ${JSON.stringify(doc)}`);
    }
  }

  async update(id, id_prod) {
    let doc = null;
    try {
      await this.conn.connect();
      let findProduct = await products.find({ _id: id_prod });
      doc = await this.collection.findByIdAndUpdate(id, {
        $set: { products: { ...findProduct } },
      });
      logger.info(doc);
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error updating cart", error);
      logger.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
      logger.info(`Cart updated: ${JSON.stringify(doc)}`);
    }
  }

  async deleteById(id, id_prod) {
    let doc = null;
    try {
      await this.conn.connect();
      doc = await this.collection.findByIdAndUpdate(
        { _id: id },
        { $pull: { products: { _id: id_prod } } }
      );
      logger.info(doc);
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error deleting product", error);
      logger.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
      logger.info(`Product deleted: ${JSON.stringify(doc)}`);
    }
  }
}

export default CartDAOMongo;
