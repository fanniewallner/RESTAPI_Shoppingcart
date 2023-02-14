const express = require("express");
const router = express.Router();
const {
  getCartById,
  createNewCart,
  deleteCartById,
  getCartItemsByCartId,
  addItemToCart,
  //deleteItemFromCart,
} = require("../controllers/cartController");

router.get("/:cartId", getCartById);
router.post("/", createNewCart);
router.delete("/:cartId", deleteCartById);

//CartItems
//Get all cartItems by cartId
//api/v1/cart/:cartItem
router.get("/cart/:cartId", getCartItemsByCartId);

//Add cartItem to cart
//api/v1/cart/:cartItem
router.post("/cart/:cartId", addItemToCart);

//delete item from cart
//api/v1/
//router.delete("/cart/:cartItemId", deleteItemFromCart);

module.exports = router;
