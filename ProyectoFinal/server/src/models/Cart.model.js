import mongoose from "mongoose";

const CartSchema = mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  products: {
    type: Array,
  },
});

const CartModel = mongoose.model("carritos", CartSchema);

export default CartModel;