const { Router } = require("express");
const {
  handleGetUserSignin,
  handleGetUserSignup,
  handlePostUserSignup,
  handlePostUserSignin,
  handleGetUserLogout,
} = require("../controllers/user");
const router = Router();

//Get
router.get("/signin", handleGetUserSignin);
router.get("/signup", handleGetUserSignup);
router.get("/logout", handleGetUserLogout);

//Post
router.post("/signup", handlePostUserSignup);
router.post("/signin", handlePostUserSignin);
module.exports = router;
