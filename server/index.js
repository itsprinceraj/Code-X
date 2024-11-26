const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const ORIGIN = process.env.ALLOWED_ORIGIN;
const cors = require("cors");

//  import necessary modules
const { dbConnect } = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

//  use middlewares;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//  apply cors config
app.use(
  cors({
    origin: ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "HEAD"],
    credentials: true,
  })
);

// add db connection
dbConnect();

//  set default route
app.get("/", (req, res) => {
  res.send(`<h1>server is running at: ${PORT}</h1>`);
});

//define routes;
app.use("/api/v1/auth/", authRoutes);
app.use("/api/v1/project/", projectRoutes);

//  listen on the port
app.listen(PORT, () => console.log(`Server started at: ${PORT}`));
