const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

// get /main
const getAllContents = asyncHandler(async (req, res) => {
  try {
    const allUsers = await User.find();
    res.render("main", { allUsers: allUsers });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// put /main/:mbti
const updateMbti = asyncHandler(async (req, res) => {
  const allUsers = await User.find();
  const mbti = req.params.mbti; // URL에서 mbti 값 추출
  const token = req.headers.authorization.split(" ")[1]; // 토큰 추출

  // 토큰 해석
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token verification failed" });
    }

    // 여기서부터 decoded에는 토큰 안에 있는 정보가 들어있음
    const userId = decoded.id;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user's mbti
    user.user_mbti = mbti;

    // Save the updated user
    await user.save();

    // 응답을 클라이언트로 보내기
    return res.status(200).json({ message: "PUT request successful" });
  });
});

// post /main
const postChat = asyncHandler(async (req, res) => {
  try {
    const { mbti, text } = req.body;
    console.log("Received mbti:", mbti);
    console.log("Received text:", text);
    const token = req.headers.authorization.split(" ")[1]; // 토큰 추출

    // 토큰 해석
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 여기서부터 decoded에는 토큰 안에 있는 정보가 들어있음
    const userId = decoded.id;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const name = user.user_name;

    // Create a new chat entry
    const chat = new Chat({
      chat_mbti: mbti,
      chat_name: name,
      chat_text: text,
    });

    // Save the chat entry to the database
    await chat.save();

    // 응답을 클라이언트로 보내기
    return res.status(201).json({ message: "POST request successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = {
  postChat,
  getAllContents,
  updateMbti,
};
