import ContainerFS from "../../ContainerFS.js";

class ProductDAOFs extends ContainerFS {
  constructor() {
    super("../../../products.json");
  }
}

export default ProductDAOFs;
