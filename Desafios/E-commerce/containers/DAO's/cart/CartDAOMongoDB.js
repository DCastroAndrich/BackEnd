import ContainerMongoDB from "../../ContainerMongoDB.js";

class CartDAOMongoDB extends ContainerMongoDB {
    constructor() {
        super("carts", {
            timestamp: {
                type: Date,
                default: Date.toLocaleString()
            },
            products: {
                type: Array
            }

        })
    }
}

export default CartDAOMongoDB;