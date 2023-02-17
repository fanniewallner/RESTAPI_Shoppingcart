const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  name: String,
  price: Number,
  quantity: {
    type: Number,
    default: 1,
    min: 0,
  },
  itemTotalPrice: Number,
  _id: false,
});

const CartSchema = new mongoose.Schema({
  items: {
    type: [CartItemSchema],
    require: true,
  },
  totalSum: {
    type: Number,
    default: 0,
    min: 0,
  },
});

module.exports = mongoose.model("Cart", CartSchema);
