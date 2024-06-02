const { Router } = require("express");
const {
  handleGetAddNew,
  handlePostAddNew,
  handleDeleteBlog,
  handleGETIdView,
  handlePostComment,
  handleGetViewAll,
  handleDeleteBlogComment,
  handlePutEditBlog,
  handleGetEditBlog,
  handleGetPagination,
} = require("../controllers/blog");
const { fileLargeHandel } = require("../middlewares/multer");
const BlogDb = require("../models/blog");
const router = Router();
const allBlog = async (req, res, next) => {
  console.log((await BlogDb.find()).length);
  next();
};

//GET
router.get("/add-new", handleGetAddNew);
router.get("/view-all", handleGetViewAll);
router.get("/page", handleGetPagination);
router.get("/:id", handleGETIdView);
router.get("/edit/:id", handleGetEditBlog);

//POST
router.post("/", fileLargeHandel, handlePostAddNew);
router.post("/comment/:blogId", handlePostComment);
//Delete
router.get("/delete/:id", handleDeleteBlog);
router.get("/delete/comment/:id", handleDeleteBlogComment);
//Update
router.post("/edit/:id", handlePutEditBlog);
module.exports = router;
