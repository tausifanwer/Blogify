const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const Blog = require("./models/blog");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookies } = require("./middlewares/auth");
const PORT = process.env.PORT || 5000;

require("dotenv").config();
//mongo connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true, // Set retryWrites as a boolean
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    socketTimeoutMS: 45000,
  })
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
  // if (!req.user) {
  //   return res.redirect("/user/signin");
  // }

  // const id = req.user._id;
  // console.log(id);
  try {
    const allBlog = await Blog.find({ postvisiblity: "public" });
    return res.render("home", {
      user: req.user,
      blogs: allBlog,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
