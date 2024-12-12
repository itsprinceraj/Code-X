const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SEC;

//   signup api;
exports.signup = async (req, res) => {
  try {
    //  get data from req.body
    const { name, userName, email, password } = req.body;

    // validate data;
    if (!name || !userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all details",
      });
    }

    // check if user Already registered with us;
    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(409).json({
        success: false,
        message: "User already exist.",
      });
    }

    //  if user is new, then encrypt pass and save it into the database;
    const hashedPass = await bcrypt.hash(password, 10);
    // console.log(hashedPass);

    await User.create({
      name: name,
      userName: userName,
      email: email.toLowerCase(),
      password: hashedPass,
    });

    // send response with success flag;
    res.status(200).json({
      success: true,
      message: "SignUp successfull",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//   login api;
exports.login = async (req, res) => {
  try {
    //  get data from req.body;
    const { email, password } = req.body;

    //  validate;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Fill all details.",
      });
    }

    //  get the user
    let user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // if user found then compare hashed password;
    const checkPass = await bcrypt.compare(password, user.password);

    //  validate
    if (!checkPass) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    //  create a payload and create token ;
    const payload = {
      email: user.email,
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: "3d",
    });

    user.token = token; // create a new field and put token in it;
    user.password = undefined;

    //  create options for cookie
    const options = {
      expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
    };

    // send cookie with success flag;
    res.cookie("token", token, options).status(200).json({
      success: true,
      message: "Login Successful.",
      data: { user, token },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
};

//  get user detail api;
exports.getUserDetails = async (req, res) => {
  try {
    // get users details
    const { userId } = req.body;

    // validate;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id not found",
      });
    }

    //  get user data by id;
    const user = await User.findOne({ _id: userId })
      .populate("projects")
      .exec();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    //  return response with success flag;
    res.status(200).json({
      success: true,
      message: "user data fetched successfully",
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};
