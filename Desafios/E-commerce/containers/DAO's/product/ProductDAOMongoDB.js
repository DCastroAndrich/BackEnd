import ContainerMongoDB from "../../ContainerMongoDB.js";

class ProductDAOMongoDB extends ContainerMongoDB {
    constructor() {
        super("products", {
            timestamp: {
                type: Date,
                default: Date.now
            },
            name: {
                type: String,
                required: true,
                max: 150
            },
            description: {
                type: String,
                required: true,
                max: 250
            },
            thumbnail: {
                type: String,
                required: true,
                max: 400
            },
            price: {
                type: Number,
                required: true
            },
            stock: {
                type: Number,
                required: true
            }

        })
    }
}

export default ProductDAOMongoDB;