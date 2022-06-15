import Product from "../classes/Product.class.js";
import crypto from "crypto";

const products = [];

const ProductController = {
  getProducts() {
    return products;
  },

  createProduct({ obj }) {
    const id = crypto.randomBytes(10).toString("hex");
    const newProduct = new Product(id, obj);
    products.push(newProduct);
    return newProduct;
  },

  updateProduct({ id, obj }) {
    let updatedProduct = null;
    const index = products.findIndex((prod) => prod.id === id);
    products[index] = obj;
    updatedProduct = products[index];
    return updatedProduct;
  },

  deleteProduct({ id }) {
    let deleted = null;
    const index = products.findIndex((prod) => prod.id === id);

    deleted = products.splice(index, 1);

    return products;
  },
};

export default ProductController;
