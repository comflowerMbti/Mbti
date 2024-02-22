const mongoose = require("mongoose");
require("dotenv").config();

// async, await
const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_CONNECT);
    // env 파일 내 DB_CONNECT 변수를 가져와서 접속하라. (시간이 걸리는 부분이므로 await)
    console.log("DB Connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConnect;
