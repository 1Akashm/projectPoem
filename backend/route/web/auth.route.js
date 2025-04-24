const express = require("express");

const {
  signUpUser,
  loginUser,
  resetPassword
} = require("../../controller/auth.controller");

const route = express.Router();

route.post("/login", loginUser);

route.post("/signup", signUpUser);

route.post("/logout", (req, res) => {
  res.status(200).send({
    status: "success",
    message: "logout",
  });
});

route.get("/email-verify", async (req, res) => {});

route.post("/forgotPassword", resetPassword);

module.exports = route;
