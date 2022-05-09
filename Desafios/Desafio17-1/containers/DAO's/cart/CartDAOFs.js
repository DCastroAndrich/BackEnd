import ContainerFs from "../../ContainerFS.js";

class CartDAOFs extends ContainerFs {
  constructor() {
    super("../../../cart.json");
  }
}

export default CartDAOFs;
