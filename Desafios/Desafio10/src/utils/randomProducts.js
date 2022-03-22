const {faker} = require("@faker-js/faker")
//import {faker} from "@faker-js/faker"

function randomProducts() {
    return {
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: faker.image.food(50, 50, true)
    }
    
}

//export default randomProducts;
module.exports = randomProducts;