import CustomError from "../../classes/CustomError.class.js";
import logger from "../../utils/logger.js";
import MongoAtlasClient from "../../classes/MongoAtlasClient.class.js";
import UserModel from "../../models/User.model.js";
import bcrypt from "bcrypt";

class UsersDAOMongo {
  constructor() {
    this.collection = UserModel;
    this.connection = new MongoAtlasClient();
  }

  async findUser(username) {
    let doc = null;
    try {
      await this.connection.connect();
      doc = await this.collection.find({ username: username });
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

  async saveUser(userdata) {
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
}

export default UsersDAOMongo;
