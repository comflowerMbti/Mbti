const express = require("express");
const router = express.Router();
const {
  getAllContents,
  updateMbti,
  postChat,
} = require("../controllers/mainController");

router.route("/").get(getAllContents).post(postChat);
router.route("/:mbti").put(updateMbti);

module.exports = router;
