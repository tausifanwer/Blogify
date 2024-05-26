const { Router } = require("express");
const {
  handleGetAddNew,
  handlePostAddNew,
  upload,
} = require("../controllers/blog");
const router = Router();

//GET
router.get("/add-new", handleGetAddNew);

//POST
router.post("/", upload.single("coverImageURL"), handlePostAddNew);

module.exports = router;
