const mongoose = require("mongoose");

//  create UserSchema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  projects: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Project",
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

//  export the userSchema with name User;
module.exports = mongoose.model("User", userSchema);
