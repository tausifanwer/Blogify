const { Router } = require("express");
const {
  handleGetUserSignin,
  handleGetUserSignup,
  handlePostUserSignup,
  handlePostUserSignin,
} = require("../controllers/user");
const router = Router();

router.get("/signin", handleGetUserSignin);
router.get("/signup", handleGetUserSignup);

router.post("/signup", handlePostUserSignup);
router.post("/signin", handlePostUserSignin);
module.exports = router;
