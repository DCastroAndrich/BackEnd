import config from "../utils/config.js";
import ProductsDAOMongo from "../services/productos/ProductosDAO.mongo.js";
import ProductsDAOMem from "../services/productos/ProductosDAO.mem.js";

class ProductsDAOFactory {
  static get() {
    switch (config.srv.PERSISTENCE) {
      case "MONGOATLAS":
        return new ProductsDAOMongo();
      case "MEM":
        return new ProductsDAOMem();
      default:
        return;
    }
  }
}

export default ProductsDAOFactory;
