module.exports = class Product {
  name;
  price;
  thumbnail;
  constructor(name, price, thumbnail) {
    (this.name = name), (this.price = price), (this.thumbnail = thumbnail);
  }
};
