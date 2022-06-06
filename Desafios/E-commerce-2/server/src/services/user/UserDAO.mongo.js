import CustomError from "../../classes/CustomError.class.js";
import DAO from "../../classes/DAO.class.js";
import logger from "../../utils/logger.js";
import bcrypt from "bcrypt";
import UserModel from "../../models/User.model.js";
import MongoAtlasClient from "../../classes/MongoAtlasClient.class.js";

class UserDAOMongo extends DAO {
  constructor() {
    super();
    this.collection = UserModel;
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
      const err = new CustomError(500, "Error getting all users", error);
      logger.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
      logger.info(`${docs.length} users found`);
    }
  }

  async getById(username) {
    let doc = null;

    try {
      await this.conn.connect();
      doc = await this.collection.find({ username: username });
      logger.info(doc);
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error getting user", error);
      logger.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
      logger.info(`${JSON.stringify(doc)} user found`);
    }
  }

  async save(userData) {
    let doc = null;
    try {
      await this.conn.connect();
      const { password } = userData;
      const hash = await bcrypt.hash(password, 10);
      const newUser = { ...userData, password: hash };

      doc = await this.collection.save(newUser);
      logger.info(doc);
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error saving new user", error);
      logger.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
      logger.info(`New user saved successfully: ${JSON.stringify(doc)}`);
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
      const err = new CustomError(500, "Error updating user", error);
      logger.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
      logger.info(`User updated: ${JSON.stringify(doc)}`);
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
      const err = new CustomError(500, "Error deleting user", error);
      logger.error(err);
      throw err;
    } finally {
      this.conn.disconnect();
      logger.info(`User deleted: ${JSON.stringify(doc)}`);
    }
  }
}
export default UserDAOMongo;
