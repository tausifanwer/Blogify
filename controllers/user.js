const UserDb = require("../models/user");

async function handleGetUserSignin(req, res) {
  res.render("signin");
}

async function handleGetUserSignup(req, res) {
  res.render("signup");
}

async function handlePostUserSignup(req, res) {
  const { fullName, email, password } = req.body;

  try {
    await UserDb.create({
      fullName,
      email,
      password,
    });
    return res.redirect("/user/signin");
  } catch (error) {
    return res.render("signup", {
      errorSignUp: "Something went wrong. Please try again ",
    });
  }
}

async function handlePostUserSignin(req, res) {
  const { email, password } = req.body;
  try {
    const token = await UserDb.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      errorSignIn: "Invalid email or password",
    });
  }
}
async function handleGetUserLogout(req, res) {
  res.clearCookie("token").redirect("signin");
}

module.exports = {
  handleGetUserSignin,
  handleGetUserSignup,
  handlePostUserSignup,
  handlePostUserSignin,
  handleGetUserLogout,
};
