import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "../utils/config.js";
import logger from "../utils/logger.js"

const URL = config.mongodb.url;

await mongoose.connect(URL);

class ContainerMongoDB {
  constructor(collectionName, schema) {
    this.collection = mongoose.model(collectionName, schema);
  }

  async getAll() {
    try {
      const docs = await this.collection.find({});
      logger.info(docs);
      return docs;
    } catch (error) {
      logger.error(error);
    }
  }

  async getById(id) {
    try {
      const doc = await this.collection.find({
        _id: id,
      });
      logger.info(doc);
      return doc;
    } catch (error) {
      logger.error(error);
    }
  }

  async newCart() {
    try {
      const newCart = new this.collection();
      let doc = await newCart.save();
      logger.info(doc.id);
      return doc.id;
    } catch (error) {
      logger.error(error);
    }
  }

  async save(obj) {
    try {
      const newObj = new this.collection(obj);
      let doc = await newObj.save();
      logger.info(doc);
      return doc;
    } catch (error) {
      logger.error(error);
    }
  }

  async update(obj, id) {
    try {
      let result = await this.collection.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            ...obj,
          },
        }
      );
      logger.info(result);
      return result;
    } catch (error) {
      logger.error(error);
    }
  }

  async saveToCart(id, id_prod) {
    try {
      let findProduct = await products.find({
        _id: id_prod,
      });
      let result = await this.collection.findByIdAndUpdate(id, {
        $set: {
          ...findProduct,
        },
      });

      logger.info(result);
      return result;
    } catch (error) {
      logger.error(error);
    }
  }

  async eraseFromCart(id) {
    try {
      let result = await this.collection.deleteOne({
        _id: id,
      });
      logger.info(result);
      return result;
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteById(id) {
    try {
      let result = await this.collection.deleteOne({
        _id: id,
      });
      logger.info(result);
      return result;
    } catch (error) {
      logger.error(error);
    }
  }
  async findUser(username) {
    try {
      const doc = await this.collection.find({
        username: username,
      });
      return doc;
    } catch (error) {
      logger.error(error);
    }
  }

  async createuser(userData) {
    try {
      const { password } = userData;
      const hash = await bcrypt.hash(password, 10);

      const newUser = new this.collection({ ...userData, password: hash });

      let doc = await newUser.save();

      return doc;
    } catch (error) {
      logger.error(error);
    }
  }
}

export default ContainerMongoDB;
