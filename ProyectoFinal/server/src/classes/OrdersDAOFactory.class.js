import config from "../utils/config.js";
import OrdersDAOMem from "../services/orders/OrdersDAO.mem.js";
import OrdersDAOMongo from "../services/orders/OrdersDAO.mongo.js";

class OrdersDAOFactory {
  static get() {
    switch (config.srv.PERSISTENCE) {
      case "MONGOATLAS":
        return new OrdersDAOMongo();
      case "MEM":
        return new OrdersDAOMem();

      default:
        return;
    }
  }
}

export default OrdersDAOFactory;
