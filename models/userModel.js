const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
    unique: true, //중복 X
  },
  user_pw: {
    type: String,
    required: true,
  },
  user_mbti: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
