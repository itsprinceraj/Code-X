//  connect to database using mogoose;
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;
const mongoose = require("mongoose");

exports.dbConnect = () => {
  mongoose
    .connect(MONGO_URL)
    .then(() => console.log("DB connection successful"))
    .catch((err) => {
      console.log(err.message);
      console.log("DB connection failed");
      process.exit(1);
    });
};
