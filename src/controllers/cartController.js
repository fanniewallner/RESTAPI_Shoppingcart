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
  if (cart) return res.status(201).json(cart);
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
  return res.status(204).json(cartToDelete);
};

//Add item to Cart
//DENNA FUNKAR ISHHHHHHHH (INTE TOTALSUM)
exports.addItemToCart = async (req, res) => {
  const cartId = req.params.cartId;
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  //const itemDetails = await Product.findById(itemId);

  const cart = await Cart.findById(cartId);
  if (!cart) throw new NotFoundError("Sorry, this shoppingcart does not exist");

  const product = await Product.findById(productId);
  if (!product) throw new NotFoundError("Sorry, this product does not exist");

  //const foundItem = cart.items.find((prod) => prod.productId == productId);

  const productToCart = {
    productId: productId,
    name: product.name,
    price: product.price,
    quantity: quantity,
    //itemTotalPrice: product.price,
    itemTotalPrice: product.price * quantity,
  };

  //console.log(productToCart);
  const foundItem = cart.items.find((prod) => prod.productId == productId);

  if (cart.items.length >= 1) {
    if (foundItem) {
      foundItem.quantity += quantity;
      foundItem.price = product.price;
      //foundItem.itemTotalPrice += product.price;
      foundItem.itemTotalPrice = foundItem.price * foundItem.quantity;
    } else {
      cart.items.push(productToCart);
    }
  } else {
    cart.items.push(productToCart);
  }

  cart.totalSum += productToCart.itemTotalPrice;

  const updatedCart = await cart.save();
  //console.log(updatedCart);
  return res.status(200).json(updatedCart);
};

//RESPONSERNA ÄR FEL HÄR MEN DEN TAR BORT EN PRODUKT
exports.deleteItemFromCart = async (req, res) => {
  const cartId = req.params.cartId;
  const productId = req.body.productId;
  const quantity = req.body.quantity;

  const cart = await Cart.findById(cartId);
  if (!cart) throw new BadRequestError("You must provide a cart id");

  const product = await Product.findById(productId);
  if (!product) throw new BadRequestError("You must provide a cart id");

  const itemToDelete = cart.items.find((prod) => prod.productId == productId);

  if (cart.items.length < 0)
    return new GraphQLError("There are no products in this cart");

  if (cart.items.length >= 1) {
    if (itemToDelete) {
      itemToDelete.quantity -= quantity;
      itemToDelete.price -= product.price;
    } else {
      cart.items.splice(itemToDelete);
    }
  } else {
    cart.items.splice(itemToDelete);
  }

  cart.save();
  return res.status(204).json(cart);
};
