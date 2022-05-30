import ContainerFirebase from "../../containers/ContainerFirebase.js";

class ProductDAOFirebase extends ContainerFirebase {
  constructor() {
    super("products");
  }
}

export default ProductDAOFirebase;
