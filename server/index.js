const cookieParser = require("cookie-parser");
const express = require("express");
const { dbConnect } = require("./config/database");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

//  use middlewares;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// add db connection
dbConnect();

//  set default route
app.get("/", (req, res) => {
  res.send(`<h1>server is running at: ${PORT}</h1>`);
});

//define routes;

//  listen on the port
app.listen(PORT, () => console.log(`Server started at: ${PORT}`));
