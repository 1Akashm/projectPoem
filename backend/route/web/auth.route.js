const express = require("express");

const {
  signUpUser,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
  logout
} = require("../../controller/auth.controller");

const route = express.Router();

route.post("/login", loginUser);

route.post("/signup", signUpUser);

route.post("/logout", logout);

route.post("/verifyEmail", verifyEmail);

route.post("/forgotPassword", forgotPassword);
route.post("/resetPassword/:token", resetPassword)

module.exports = route;
