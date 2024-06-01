const BlogDb = require("../models/blog");
const CommentDb = require("../models/comment");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { updateOne } = require("../models/user");
//Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });
//GET
async function handleGetAddNew(req, res) {
  return res.render("addBlog", {
    user: req.user,
  });
}
async function handleGetViewAll(req, res) {
  if (!req.user) return res.redirect("/");
  const allBlogs = await BlogDb.find({ createdBy: req.user._id });

  return res.render("allBlog", {
    user: req.user,
    blogs: allBlogs,
  });
}
async function handleGETIdView(req, res) {
  const blog = await BlogDb.findById(req.params.id).populate("createdBy");
  const comment = await CommentDb.find({ blogId: blog }).populate("createdBy");
  return res.render("blog", {
    user: req.user,
    blog: blog,
    comments: comment,
  });
}
async function handleGetEditBlog(req, res) {
  const { id } = req.params;
  const blog = await BlogDb.findById(id).populate("createdBy");

  return res.render("editBlog", {
    user: req.user,
    blog: blog,
  });
}

//POST
async function handlePostAddNew(req, res) {
  const { title, body, postvisiblity } = req.body;
  const coverImageURL = req.file
    ? `/uploads/${req.file.filename}`
    : "/images/blog-image.png";
  const blog = await BlogDb.create({
    body,
    title,
    postvisiblity,
    createdBy: req.user._id,
    coverImageURL: coverImageURL,
  });
  return res.redirect(`/blog/${blog._id}`);
}
async function handlePostComment(req, res) {
  await CommentDb.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
}

//Delete
async function handleDeleteBlog(req, res) {
  const { id } = req.params;
  const blog = await BlogDb.findByIdAndDelete(id);
  const defaultImage = path.resolve("./public/images/blog-image.png");
  try {
    const uploadsImage = path.resolve(`./public/${blog.coverImageURL}`);
    if (uploadsImage !== defaultImage) {
      fs.unlinkSync(path.resolve(uploadsImage));
      return res.redirect("/");
    } else {
      return res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
}

async function handleDeleteBlogComment(req, res) {
  const { id } = req.params;
  const commentId = await CommentDb.findById({ _id: id });
  await CommentDb.findByIdAndDelete(id);
  try {
    await CommentDb.findByIdAndDelete(id);
    return res.redirect(`/blog/${commentId.blogId}`);
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
}

//Update
async function handlePutEditBlog(req, res) {
  const { title, body, postvisiblity } = req.body;
  const { id } = req.params;
  const blog = await BlogDb.findByIdAndUpdate(
    id,
    {
      title,
      body,
      postvisiblity,
    },
    { new: true }
  );
  console.log(blog);
  return res.redirect("/");
}

module.exports = {
  handleGetAddNew,
  handlePostAddNew,
  upload,
  handleDeleteBlog,
  handleGETIdView,
  handlePostComment,
  handleGetViewAll,
  handleDeleteBlogComment,
  handlePutEditBlog,
  handleGetEditBlog,
};
