const Product = require("../models/Product");
const { BadRequestError, NotFoundError } = require("../utils/errors");

exports.getAllProducts = async (req, res, next) => {
  const limit = Number(req.query.limit || 10);
  const offset = Number(req.query.offset || 0);

  const products = await Product.find().limit(limit).skip(offset);
  const totalProductsInDatabase = await Product.countDocuments();
  return res.json({
    data: products,
    meta: {
      total: totalProductsInDatabase,
      limit: limit,
      offset: offset,
      count: products.length,
    },
  });
};

exports.getProductById = async (req, res, next) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId);

  if (!product) throw new NotFoundError("That product does not exist");

  return res.json(product);
};
