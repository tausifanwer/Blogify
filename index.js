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
const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB server");
});

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});
//middleware
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
// app.use("/public/images", express.static("public"));
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
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 8;
    let skip = (page - 1) * limit;
    const all = await Blog.find({ postvisiblity: "public" })
      .skip(skip)
      .limit(limit);
    return res.render("home", {
      user: req.user,
      all: all,
      page: page,
      limit: limit,
    });
  } catch (error) {
    console.log(error);
    return res.render("home");
  }
});

// app.get("/search", async (req, res) => {
//   const title = req.query.title;
//   return res.render("search", {
//     title: title,
//   });
// });

app.get("/search", async (req, res) => {
  const title = req.query.title;
  console.log(req.query.title + "..........");
  const user = req.user;
  // console.log(user);
  let alll = [];

  try {
    if (user) {
      const searchTi = await Blog.find({
        postvisiblity: "public",
        title: { $regex: title },
      });
      const searchSe = await Blog.find({
        postvisiblity: "public",
        search: { $regex: title },
      });

      if (searchSe.length !== 0) {
        alll = searchSe;
        return res.render("search", {
          user: req.user,
          alll: alll,
          title: title,
        });
      } else if (searchTi.length !== 0) {
        alll = searchTi;
        return res.render("search", {
          user: req.user,
          alll: alll,
          title: title,
        });
      } else {
        return res.json({
          Search: "Search not Founded",
        });
      }
    } else {
      const searchTi = await Blog.find({
        postvisiblity: "public",
        title: { $regex: title },
      });
      const searchSe = await Blog.find({
        postvisiblity: "public",
        search: { $regex: title },
      });
      if (searchSe.length !== 0) {
        alll = searchSe;
        return res.render("search", {
          alll: alll,
          title: title,
        });
      } else if (searchTi.length !== 0) {
        alll = searchTi;
        return res.render("search", {
          alll: alll,
          title: title,
        });
      } else {
        return res.json({
          Search: "Search not Founded",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
