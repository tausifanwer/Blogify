const { Router } = require("express");
const {
  handleGetAddNew,
  handlePostAddNew,
  upload,
  handleDeleteBlog,
  handleGETIdView,
  handlePostComment,
  handleGetViewAll,
} = require("../controllers/blog");
const router = Router();

//GET
router.get("/add-new", handleGetAddNew);
router.get("/view-all", handleGetViewAll);
router.get("/:id", handleGETIdView);
//POST
router.post("/", upload.single("coverImageURL"), handlePostAddNew);
router.post("/comment/:blogId", handlePostComment);
//Delete
router.get("/delete/:id", handleDeleteBlog);
module.exports = router;
