const JWT = require("jsonwebtoken");
const secret = "0#Tausif@123$0";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
  };
  const token = JWT.sign(payload, secret, {
    expiresIn: "1d",
  });
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
