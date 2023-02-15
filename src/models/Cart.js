const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  name: String,
  price: Number,
  quantity: Number,
});

const CartSchema = new mongoose.Schema({
  items: {
    type: [CartItemSchema],
    require: true,
  },
  totalSum: {
    type: Number,
  },
});

/*
const CartSchema = new mongoose.Schema({
  items: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "CartItem",
  },
  totalSum: {
    type: Number,
  },
});*/

module.exports = mongoose.model("Cart", CartSchema);
