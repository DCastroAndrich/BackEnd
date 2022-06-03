import config from "../utils/config.js";
import CartDAOFile from "../services/cart/CartDAO.file.js";
import CartDAOMem from "../services/cart/CartDAO.mem.js";
import CartDAOMongo from "../services/cart/CartDAO.mongo.js";

class CartDAOFactory {
  static get() {
    switch (config.srv.PERSISTENCE) {
      case "MEM":
        return new CartDAOMem();
      case "FILE":
        return new CartDAOFile();
      case "MONGOATLAS":
        return new CartDAOMongo();

      default:
        return;
    }
  }
}

export default CartDAOFactory;
