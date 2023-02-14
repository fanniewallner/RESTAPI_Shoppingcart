require("dotenv").config();
const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const { notFoundMiddleware } = require("./middleware/notFoundMiddleware");
const cartRoutes = require("./routes/cartRoutes");
const productRoutes = require("./routes/productRoutes");
//const cartItemRoutes = require("./routes/cartItemRoutes");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Processing ${req.method} request to ${req.path}`);
  next();
});

app.use("/api/v1/carts", cartRoutes);
//app.use("/api/v1/cartItem", cartItemRoutes);
app.use("/api/v1/products", productRoutes);

app.use(errorMiddleware);

const port = process.env.PORT || 5000;

async function run() {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    //await Product.create(mockProductData);

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

run();
