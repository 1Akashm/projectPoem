const User = require("../model/auth.model");
const bcrypt = require("bcrypt");

const signUpUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({
        status: "failed",
        message: "All fields are required",
      });
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      name,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      status: "success",
      message: "Successfully signed up user",
      newUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Failed to sign up user",
      error: error.message,
    });
  }
};

module.exports = signUpUser;
