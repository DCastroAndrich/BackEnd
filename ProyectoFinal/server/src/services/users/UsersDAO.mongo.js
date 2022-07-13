import CustomError from "../../classes/CustomError.class.js";
import DAO from "../../classes/DAO.class.js";
import logger from "../../utils/logger.js";
import MongoAtlasClient from "../../classes/MongoAtlasClient.class.js";
import UserModel from "../../models/User.model.js";
import bcrypt from "bcrypt";

class UsersDAOMongo extends DAO {
  constructor() {
    super();
    this.collection = UserModel;
    this.connection = new MongoAtlasClient();
  }

  async getAll() {
    let docs = [];
    try {
      await this.connection.connect();
      docs = await this.collection.find({});
      logger.info(docs);
    } catch (error) {
      const err = new CustomError(500, "Error getting all users", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`${docs.length} users found`);
    }
  }

  async getById(username) {
    let doc = null;
    try {
      await this.connection.connect();
      doc = await this.collection.find({ email: username });
      logger.info(doc);
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error getting user", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`User found: ${JSON.stringify(doc)}`);
    }
  }

  async save(userdata) {
    let doc = null;
    try {
      await this.connection.connect();

      const { password } = userdata;

      const hash = await bcrypt.hash(password, 10);

      const newUser = new this.collection({ ...userdata, password: hash });

      doc = await newUser.save();

      logger.info(doc);

      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error saving new user", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`New user saved successfully: ${JSON.stringify(doc)}`);
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
      const err = new CustomError(500, "Error updating user", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`User updated successfully: ${JSON.stringify(doc)}`);
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
      const err = new CustomError(500, "Error deleting user", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`User deleted successfully: ${JSON.stringify(doc)}`);
    }
  }
}

export default UsersDAOMongo;
