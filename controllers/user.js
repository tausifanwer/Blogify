const UserDb = require("../models/user");

async function handleGetUserSignin(req, res) {
  res.render("signin");
}

async function handleGetUserSignup(req, res) {
  res.render("signup");
}

async function handlePostUserSignup(req, res) {
  const { fullName, email, password } = req.body;
  await UserDb.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
}

async function handlePostUserSignin(req, res) {
  const { email, password } = req.body;
  try {
    const userObj = await UserDb.matchPassword(email, password);
    console.log("User", userObj);
    return res.redirect("/");
  } catch (error) {
    return res.render("signin");
  }
}

module.exports = {
  handleGetUserSignin,
  handleGetUserSignup,
  handlePostUserSignup,
  handlePostUserSignin,
};
