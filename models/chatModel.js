const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  chat_mbti: {
    type: String,
    required: true,
  },
  chat_name: {
    type: String,
    required: true,
  },
  chat_text: {
    type: String,
    required: true,
  },
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
