import CustomError from "../../classes/CustomError.class.js";
import DAO from "../../classes/DAO.class.js";
import logger from "../../utils/logger.js";
import ProductModel from "../../models/Product.model.js";
import MongoAtlasClient from "../../classes/MongoAtlasClient.class.js";

class ProductDAOMongo extends DAO {
  constructor() {
    this.collection = ProductModel;
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
      const err = new CustomError(500, "Error getting all products", error);
      logger.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
      logger.info(`${docs.length} products found`);
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
      const err = new CustomError(500, "Error getting product", error);
      logger.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
      logger.info(`${JSON.stringify(doc)} product found`);
    }
  }

  async save(obj) {
    let doc = null;
    try {
      await this.conn.connect();
      doc = await this.collection.save(obj);
      logger.info(doc);
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error saving new product", error);
      logger.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
      logger.info(`New product saved successfully: ${JSON.stringify(doc)}`);
    }
  }
  async update(obj) {
    let doc = null;
    try {
      await this.conn.connect();
      doc = await this.collection.updateOne(
        { _id: obj.id },
        { $set: { ...obj } }
      );
      logger.info(doc);
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error updating product", error);
      logger.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
      logger.info(`Product updated: ${JSON.stringify(doc)}`);
    }
  }
  async deleteById(id) {
    let doc = null;
    try {
      await this.conn.connect();
      doc = await this.collection.deleteOne({ _id: id });
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

export default ProductDAOMongo;
