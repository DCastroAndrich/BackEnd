import ContainerMongoDB from "../../containers/ContainerMongoDB.js";

class CartDAOMongoDB extends ContainerMongoDB {
  constructor() {
    super("carts", {
      timestamp: {
        type: Date,
        default: Date.now,
      },
      products: {
        type: Array,
      },
    });
  }
}

export default CartDAOMongoDB;
