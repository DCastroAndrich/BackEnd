class Product {
  constructor(id, { name, description, thumbnail, price, stock, timestamp }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.thumbnail = thumbnail;
    this.price = price;
    this.stock = stock;
    this.timestamp = timestamp;
  }
}

export default Product;
