import ContainerFirebase from "../../ContainerFirebase.js";

class ProductDAOFirebase extends ContainerFirebase {
    constructor() {
        super("products")
    }
}

export default ProductDAOFirebase;