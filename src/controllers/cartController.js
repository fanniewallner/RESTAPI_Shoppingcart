// const cart = require("../models/Cart");
const Cart = require("../models/Cart");
const CartItem = require("../models/Cart");
const Product = require("../models/Product");
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

//Add item to Cart //mappa?
//DENNA FUNKAR ISHHHHHHHH
exports.addItemToCart = async (req, res) => {
  const cartId = req.params.cartId;
  const itemId = req.body.itemId;
  const itemDetails = await Product.findById(itemId);
  const totalSum = req.body.totalSum;

  if (!Cart) throw new BadRequestError("You must provide a cart id");
  let updatedCart = await Cart.findById(cartId);

  console.log(itemDetails);

  updatedCart.items.push({
    itemId: itemDetails.id,
    name: itemDetails.name,
    price: itemDetails.price,
    quantity: itemDetails.quantity,
    totalSum: parseInt(itemDetails.price * itemDetails.quantity),
  });
  updatedCart.save();

  return res.json(updatedCart);
};

/*
exports.addItemToCart = async (req, res) => {
  const cartId = req.params.cartId;
  const itemId = req.body.itemId;
  name = req.body.name;
  const price = req.body.price;
  const quantity = req.body.quantity;

  let cart = await Cart.findById(cartId);
  if (cart) {
    let itemIndex = cart.items.findIndex((i) => i.itemId === itemId);
    if (itemIndex > -1) {
      let cartItem = cart.items[itemIndex];
      cartItem.quantity = quantity;
      cart.items[itemIndex] = cartItem;
    } else {
      cart.items.push({ itemId, name, price, quantity });
    }
    cart.save();
    return res.status(201).send(Cart);
  }
};*/

//Delete item from cart
//splice??? findIndex??
/*
const cartItemId = req.params.id;
const itemToDelete = await CartItem.findById(cartItemId);
if (!itemToDelete) throw new NotFoundError("That cartitem does not exist");
await itemToDelete.delete();

return res.sendStatus(204);
*/
