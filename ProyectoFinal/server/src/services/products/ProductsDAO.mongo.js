import CustomError from "../../classes/CustomError.class.js";
import DAO from "../../classes/DAO.class.js";
import logger from "../../utils/logger.js";
import ProductModel from "../../models/Product.model.js";
import MongoAtlasClient from "../../classes/MongoAtlasClient.class.js";

class ProductsDAOMongo extends DAO {
  constructor() {
    super();
    this.collection = ProductModel;
    this.connection = new MongoAtlasClient();
  }

  async getAll() {
    let docs = [];
    try {
      await this.connection.connect();
      docs = await this.collection.find({});
      logger.info(docs);
      return docs;
    } catch (error) {
      const err = new CustomError(500, "Error getting all products", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`${docs.length} products found`);
    }
  }
  async getById(id) {
    let doc = null;
    try {
      await this.connection.connect();
      doc = await this.collection.find({ _id: id });
      logger.info(doc);
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error getting product", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`Product found: ${JSON.stringify(doc)}`);
    }
  }
  async save(obj) {
    let doc = null;
    try {
      await this.connection.connect();
      doc = await this.collection.save(obj);
      logger.info(doc);
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error saving new product", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`New product saved successfully: ${JSON.stringify(doc)}`);
    }
  }

  async update(obj) {
    let doc = null;
    try {
      await this.connection.connect();
      doc = await this.collection.updateOne(
        { _id: obj._id },
        { $set: { ...obj } }
      );
      logger.info(doc);
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error updating product", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`Product updated successfully: ${JSON.stringify(doc)}`);
    }
  }

  async deleteById(id) {
    let doc = null;
    try {
      await this.connection.connect();
      doc = await this.collection.deleteOne({ _id: id });
      logger.info(doc);
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error updating product", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`Product updated successfully: ${JSON.stringify(doc)}`);
    }
  }
}

export default ProductsDAOMongo;
