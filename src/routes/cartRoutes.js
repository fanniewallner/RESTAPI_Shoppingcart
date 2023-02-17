const express = require("express");
const router = express.Router();
const {
  getCartById,
  createNewCart,
  deleteCartById,
  //getCartItemsByCartId,
  addItemToCart,
  deleteItemFromCart,
} = require("../controllers/cartController");

router.get("/:cartId", getCartById);
router.post("/", createNewCart);
router.delete("/:cartId/deleteCart", deleteCartById);
//router.get("/:cartId/getProducts", getCartItemsByCartId);
router.post("/:cartId/addProduct", addItemToCart);
router.delete("/:cartId/deleteProduct", deleteItemFromCart);

module.exports = router;
