const { upload } = require("../controllers/blog");
const multer = require("multer");
async function fileLargeHandel(req, res, next) {
  upload.single("coverImageURL")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).render("addBlog", {
          errorLimitImage: "Size of Image to Large less than 2mb",
          user: req.user,
        });
      }
      // Handle other Multer errors
      console.log("pdf");
      return res.status(400).render("addBlog", {
        message: err.message,
        user: req.user,
      });
    } else if (err) {
      // An unknown error occurred when uploading

      return res.status(400).render("addBlog", {
        message: "Only JPG ,PNG ,JPEG File Supported",
        user: req.user,
      });
    }
    // Proceed to the next middleware if no errors
    next();
  });
}

module.exports = { fileLargeHandel };
