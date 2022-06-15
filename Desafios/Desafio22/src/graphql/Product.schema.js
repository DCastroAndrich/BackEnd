import { buildSchema } from "graphql";

const ProductSchema = buildSchema(`
    type Product {
        id: ID!
        name: String
        description: String
        thumbnail: String
        price: Float
        stock: Int
        timestamp: Float
    }

    input ProductInput {
        name: String
        description: String
        thumbnail: String
        price: Float
        stock: Int
        timestamp: Float
    }

    type Query {
        getProducts: [Product]
    }

    type Mutation {
        createProduct(obj: ProductInput): Product
        updateProduct(id: ID!, obj: ProductInput): Product
        deleteProduct(id: ID!): [Product]
    }

`);

export default ProductSchema;
