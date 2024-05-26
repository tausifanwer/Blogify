const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const Blog = require("./models/blog");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookies } = require("./middlewares/auth");
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
app.use(cookieParser());
app.use(checkForAuthenticationCookies("token"));
app.use(express.static(path.resolve("./public")));
//middleWare-User
app.use("/user", userRoute);
app.use("/blog", blogRoute);
//routes
app.get("/", async (req, res) => {
  const allBlog = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlog,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
