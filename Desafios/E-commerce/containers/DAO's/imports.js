import ProductDAOMongoDB from "./product/ProductDAOMongoDB.js";
import ProductDAOFirebase from "./product/ProductDAOFirebase.js";

import CartDAOFirebase from "./cart/CartDAOFirebase.js";
import CartDAOMongoDB from "./cart/CartDAOMongoDB.js";


let DAOProducts;
let DAOCarts;

switch (process.env.DBTYPE) {
  case "Mongo":
    DAOProducts = ProductDAOMongoDB;
    DAOCarts = CartDAOMongoDB;
    break;
  case "Firebase":
    DAOProducts = ProductDAOFirebase;
    DAOCarts = CartDAOFirebase;

    break;
  default:
    DAOProducts = ProductDAOMongoDB;
    DAOCarts = CartDAOMongoDB;

    break;
}

export { DAOProducts, DAOCarts };
