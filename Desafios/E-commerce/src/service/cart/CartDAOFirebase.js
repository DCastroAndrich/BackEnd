import ContainerFirebase from "../../containers/ContainerFirebase.js";

class CartDAOFirebase extends ContainerFirebase {
  constructor() {
    super("carts");
  }
}

export default CartDAOFirebase;
