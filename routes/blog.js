const { Router } = require("express");
const {
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
} = require("../controllers/blog");
const router = Router();

//GET
router.get("/add-new", handleGetAddNew);
router.get("/view-all", handleGetViewAll);
router.get("/:id", handleGETIdView);
router.get("/edit/:id", handleGetEditBlog);
//POST
router.post("/", upload.single("coverImageURL"), handlePostAddNew);
router.post("/comment/:blogId", handlePostComment);
//Delete
router.get("/delete/:id", handleDeleteBlog);
router.get("/delete/comment/:id", handleDeleteBlogComment);
//Update
router.post("/edit/:id", upload.single("coverImageURL"), handlePutEditBlog);
module.exports = router;
