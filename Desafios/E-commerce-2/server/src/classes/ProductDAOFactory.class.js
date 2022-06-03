import config from "../utils/config.js";
import ProductDAOFile from "../services/product/ProductDAO.file.js";
import ProductDAOMem from "../services/product/ProductDAO.mem.js";
import ProductDAOMongo from "../services/product/ProductDAO.mongo.js";

class ProductDAOFactory {
  static get() {
    switch (config.srv.PERSISTENCE) {
      case "MEM":
        return new ProductDAOMem();
      case "FILE":
        return new ProductDAOFile();
      case "MONGOATLAS":
        return new ProductDAOMongo();

      default:
        return;
    }
  }
}

export default ProductDAOFactory;
