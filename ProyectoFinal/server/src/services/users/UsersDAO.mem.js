import CustomError from "../../classes/CustomError.class.js";
import logger from "../../utils/logger.js";

class UsersDAOMem {
  constructor() {
    this.collections = [];
  }

    findUser(id) {
    let doc = null;

    try {
      doc = this.collection.find((doc) => {
        return doc.id === id;
      });
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error getting user", error);
      logger.error(err);
      throw err;
    } finally {
      logger.info(`User found: ${JSON.stringify(doc)}`);
    }
  }

  saveUser(obj) {
    let doc = null;
    try {
      let newId;
      if (this.collection.length == 0) {
        newId = 1;
      } else {
        newId = this.collection[this.collection.length - 1].id + 1;
      }
      doc = { ...obj, id: newId };
      this.collection.push(doc);
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error saving new user", error);
      logger.error(err);
      throw err;
    } finally {
      logger.info(`New user saved successfully: ${JSON.stringify(doc)}`);
    }
  }
  
}

export default UsersDAOMem;