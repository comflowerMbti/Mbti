const express = require("express");
const dbConnect = require("./db/dbConnect");
const methodOverride = require("method-override");

const app = express();

dbConnect();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./public"));

app.use(methodOverride("_method"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/loginRoutes"));
app.use("/main", require("./routes/mainRoutes"));

app.listen(5000, () => {
  console.log("5000번 포트에서 서버 실행 중...");
});
