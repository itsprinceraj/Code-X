const express = require("express");
const router = express.Router();
const authRoute = require("../controller/auth");
const { signup, login, getUserDetails } = authRoute;

//  create auth routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/getUser", getUserDetails);

module.exports = router;
