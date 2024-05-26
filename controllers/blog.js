const BlogDb = require("../models/blog");
const multer = require("multer");
const path = require("path");

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
  console.log(req.user);
  return res.render("addBlog", {
    user: req.user,
  });
}

//POST
async function handlePostAddNew(req, res) {
  const { title, body } = req.body;
  const blog = await BlogDb.create({
    body,
    title,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
}

module.exports = {
  handleGetAddNew,
  handlePostAddNew,
  upload,
};
