const express = require("express");
const signUpUser = require("../../controller/auth.controller");
const route = express.Router();

route.post("/login", (req, res) => {
  res.status(201).send({
    status: "success",
    message: "login",
  });
});

route.post("/signup", signUpUser);

route.post("/logout", (req, res) => {
  res.status(200).send({
    status: "success",
    message: "logout",
  });
});

module.exports = route;
