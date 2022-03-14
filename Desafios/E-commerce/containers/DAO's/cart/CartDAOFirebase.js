import ContainerFirebase from "../../ContainerFirebase.js";

class CartDAOFirebase extends ContainerFirebase {
    constructor() {
        super("carts")
    }
}

export default CartDAOFirebase