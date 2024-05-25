const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const userRoute = require("./routes/user");
const PORT = 5000;

//mongo connection
mongoose
  .connect("mongodb://127.0.0.1:27017/blogify")
  .then(() => {
    console.log("mongoose connected!--");
  })
  .catch((err) => {
    console.log(err, "Some ERROR TO CONNECT MONGOOSE");
  });
//middleware
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//middleWare-User
app.use("/user", userRoute);
//routes
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
