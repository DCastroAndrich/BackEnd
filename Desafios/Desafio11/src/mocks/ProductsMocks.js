const ProductsContainer = require("../containers/ContainerMemory")
//import ProductsContainer from "../containers/ContainerMemory.js";
const randomProducts = require("../utils/randomProducts")
//import randomProducts from "../utils/randomProducts.js";

class ProductsMock extends ProductsContainer {
  constructor() {
    super();
  }

  random() {
    let items = [];
    for (let index = 0; index <= 5; index++) {
      let randomItems = randomProducts();
      items.push(randomItems);
    }
    console.log(items)
    return items;
  }
}

//export default ProductsMock;
module.exports = ProductsMock
