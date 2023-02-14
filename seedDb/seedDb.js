require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../src/models/Product");
const { mockProductData } = require("./products");

const populateDbWithMockData = async (connectionstring) => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(connectionstring);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    await Product.deleteMany();

    const productRes = await Product.create(mockProductData);

    console.log("Database successfully populated with test data");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
};

populateDbWithMockData(process.env.MONGO_CONNECTION_STRING);
