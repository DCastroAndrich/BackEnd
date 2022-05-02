import { faker } from "@faker-js/faker";
faker.locale = "es";

function createProducts(n) {
  const products = [];
  for (let i = 1; i <= n; i++) {
    const fakeProd = randomProduct(i);
    products.push(fakeProd);
  }
  return products;
}

function randomProduct(id) {
  const random = {
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    thumbnail: `${faker.image.food(50, 50, true)}?${isNaN(id) ? 1 : id}`,
  };
  if (id) {
    prod.id = id;
  }
  return random;
}


export { createProducts, randomProduct}