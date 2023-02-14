const cart = require("../models/Cart");
const Cart = require("../models/Cart");
const CartItem = require("../models/Cart");
const { NotFoundError, BadRequestError } = require("../utils/errors");

//CART
exports.getCartById = async (req, res, next) => {
  const cartId = req.params.cartId;
  const cart = await Cart.findById(cartId);

  if (!cart) throw new NotFoundError("This cart does not exist");
  return res.json(cart);
};

exports.createNewCart = async (req, res, next) => {
  const items = req.body.items;
  const totalSum = req.body.totalSum;
  const newCart = await Cart.create({
    items: items,
    totalSum: totalSum,
  });
  return res
    .setHeader(
      "location",
      `http://localhost:${process.env.PORT}/api/v1/carts/${newCart._id}`
    )
    .status(201)
    .json(newCart);
};

exports.deleteCartById = async (req, res, next) => {
  const cartId = req.params.cartId;
  const cartToDelete = await Cart.findById(cartId);

  if (!cartToDelete) throw new NotFoundError("This cart does not exist");
  await cartToDelete.delete();
  return res.sendStatus(204);
};

//CARTITEMS
exports.getCartItemsByCartId = async (req, res, next) => {
  const cartId = req.params.cartId;
  const cart = await cart.findById(cartId);

  if (!cart) throw new NotFoundError("That cart does not exist");

  const filters = {};
  if (req.query?.cartId) filters.cart = req.query.cartId;

  const cartItems = await this.getCartItemsByCartId.find(filters);

  if (!cartItems)
    throw new NotFoundError("That cart does not have any items yet");
  return res.json(cartItem);
};

//Add item to Cart
exports.addItemToCart = async (req, res) => {
  const cartId = req.params.cartId;
  //const { CartItem } = req.body
  const name = req.body.name;
  const price = req.body.price;
  const quantity = req.body.quantity;

  if (!cartId) throw new BadRequestError("You have to provide a cart id");

  const newCartItem = await CartItem.create({
    name: name,
    price: price,
    quantity: quantity,
  });
  console.log(newCartItem);
  return res
    .setHeader("Location", `/api/v1/carts/${cartId}/${newCartItem._id}`)
    .status(201)
    .json(newCartItem);
};

//Delete item from cart
//splice??? findIndex??
/*
const cartItemId = req.params.id;
const itemToDelete = await CartItem.findById(cartItemId);
if (!itemToDelete) throw new NotFoundError("That cartitem does not exist");
await itemToDelete.delete();

return res.sendStatus(204);
*/
/*
RADERAR EN HEL CART!!!!
exports.deleteItemFromCart = async (req, res, next) => {
  const cartItemId = req.params.cartItemId;
  const cartItemToDelete = await CartItem.findById(cartItemId);
  if (!cartItemToDelete)
    throw new NotFoundError("This item does not exist in cart");
  await cartItemToDelete.delete();
  return res.sendStatus(204);
};
*/
