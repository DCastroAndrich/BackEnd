import config from "../utils/config.js";
import CartDAOMem from "../services/carts/CartDAO.mem.js";
import CartDAOMongo from "../services/carts/CartDAO.mongo.js";

class CartDAOFactory {
  static get() {
    switch (config.srv.PERSISTENCE) {
      case "MONGOATLAS":
        return CartDAOMongo();
      case "MEM":
        return new CartDAOMem();

      default:
        return;
    }
  }
}

export default CartDAOFactory;
