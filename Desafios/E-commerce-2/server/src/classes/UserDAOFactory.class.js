import config from "../utils/config.js";
import UserDAOFile from "../services/user/UserDAO.file.js";
import UserDAOMem from "../services/user/UserDAO.mem.js";
import UserDAOMongo from "../services/user/UserDAO.mongo.js";

class UserDAOFactory {
  static get() {
    switch (config.srv.PERSISTENCE) {
      case "MEM":
        return new UserDAOMem();
      case "FILE":
        return new UserDAOFile();
      case "MONGOATLAS":
        return new UserDAOMongo();

      default:
        return;
    }
  }
}

export default UserDAOFactory;
