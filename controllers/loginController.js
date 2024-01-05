const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
//해시
const bcrypt = require("bcrypt");
//env
require("dotenv").config();
//토큰
const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

// get '/'
const getLogin = (req, res) => {
  res.render("login");
};

// post '/'
const loginUser = asyncHandler(async (req, res) => {
  const { user_id, user_pw } = req.body;
  const allUsers = await User.find();
  const user = await User.findOne({ user_id });

  if (!user) {
    // 'login.ejs'를 렌더링하고 알림 메시지를 전달합니다.
    return res.render("login", { message: "일치하는 사용자가 없습니다." });
  }

  const isMatch = await bcrypt.compare(user_pw, user.user_pw);

  if (!isMatch) {
    // 'login.ejs'를 렌더링하고 알림 메시지를 전달합니다.
    return res.render("login", { message: "비밀번호가 일치하지 않습니다." });
  }

  // 'user.user_mbti'의 존재 여부에 대한 추가 확인
  const user_mbti = user.user_mbti || ""; // 'user_mbti'가 정의되지 않은 경우 기본값으로 빈 문자열 설정

  const chat = await Chat.find({ chat_mbti: user_mbti });

  const token = jwt.sign({ id: user._id }, jwtSecret);
  res.cookie("token", token, {
    httpOnly: false,
  });

  // 필요한 데이터와 함께 'main.ejs'를 렌더링합니다.
  res.render("main", { allUsers: allUsers, user: user, chat: chat });
});

// get /register
const getRegister = (req, res) => {
  res.render("register");
};

// post /register
const registerUser = asyncHandler(async (req, res) => {
  const { user_name, user_email, user_id, user_pw, user_mbti } = req.body;

  const hashedPassword = await bcrypt.hash(user_pw, 10);
  const user = await User.create({
    user_name,
    user_email,
    user_id,
    user_pw: hashedPassword,
    user_mbti,
  });

  res.render("login", { message: "회원가입 성공" });
});

module.exports = { getLogin, loginUser, getRegister, registerUser };
