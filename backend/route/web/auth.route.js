const express = require("express");

const {
  signUpUser,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
  logout,
  checkAuth
} = require("../../controller/auth.controller");


const verifyToken = require("../../middleware/verifyToke");

const route = express.Router();

route.get("/checkAuth",verifyToken,checkAuth);

route.post("/login", loginUser);

route.post("/signup", signUpUser);

route.post("/logout", logout);

route.post("/verifyEmail", verifyEmail);

route.post("/forgotPassword", forgotPassword);
route.post("/resetPassword/:token", resetPassword)

module.exports = route;
