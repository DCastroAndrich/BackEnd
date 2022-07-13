import config from "../utils/config.js";
import UsersDAOMongo from "../services/users/UsersDAO.mongo.js";
import UsersDAOMem from "../services/users/UsersDAO.mem.js";

class UsersDAOFactory {
  static get() {
    switch (config.srv.PERSISTENCE) {
      case "MONGOATLAS":
        return UsersDAOMongo();
      case "MEM":
        return UsersDAOMem();
      default:
        return;
    }
  }
}

export default UsersDAOFactory;
