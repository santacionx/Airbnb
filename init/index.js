const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  try {
    await mongoose.connect(MONGO_URL);

    // Clear existing data and insert new listings
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);

    console.log("Data was initialized");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error initializing data:", error);
  }
}

main();