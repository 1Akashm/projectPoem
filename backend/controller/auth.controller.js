const User = require("../model/auth.model");
const bcrypt = require("bcrypt");
const generateVerificationToken = require("../utils/generateVerificationToken");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie");
const sendVerificationEmail = require("../utils/sendVerificationEmail");

const signUpUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({
        status: "failed",
        message: "All fields are required",
      });
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({
        status: "Failed",
        message: "User already exists",
      });
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationToken = generateVerificationToken();

    
    const newUser = new User({
      email,
      name,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    
    generateTokenAndSetCookie(res,newUser._id);

    sendVerificationEmail(newUser.name,newUser.email,verificationToken)

    await newUser.save();
    
    return res.status(201).json({
      status: "success",
      message: "Successfully signed up user",
      newUser:{
        ...newUser._doc,
        password: undefined
      },
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
