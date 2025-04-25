const User = require("../model/auth.model");
const crypto = require("crypto");
require("dotenv").config();

const bcrypt = require("bcrypt");
const generateVerificationToken = require("../utils/generateVerificationToken");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie");
const {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendResetSuccessful,
  sendWelcomeEmail,
} = require("../utils/sendVerificationEmail");

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

    generateTokenAndSetCookie(res, newUser._id);

    await sendVerificationEmail(newUser.name, newUser.email, verificationToken);

    await newUser.save();

    return res.status(201).json({
      status: "success",
      message: "Successfully signed up user",
      newUser: {
        ...newUser._doc,
        password: undefined,
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

const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.json({
        status: "Failed",
        message: "verification failed",
      });
    }

    user.isAccountVerified = true;

    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();
    await sendWelcomeEmail(user.email, user.name);

    res.json({
      status: "success",
      message: "account verified successful",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.json({
      status: "Failed",
      message: "failed to verify email",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        status: "Failed",
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({
        status: "Failed",
        message: "Invalid password",
      });
    }

    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.json({
      status: "Success",
      message: "Login successful",
      user: {
        ...user.toObject(), // this avoids Mongoose metadata issues
        password: undefined,
      },
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.json({
      status: "Failed",
      message: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        status: "Failed",
        message: "Email doesn't exist to reset password",
      });
    }

    //generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetPasswordExpiresAt;

    await user.save();

    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/forgotPassword/${resetToken}`
    );

    return res.json({
      status: "success",
      message: "reset password link sent to email",
    });
  } catch (error) {
    console.log("Error in forgotPassword ", error);
    res.json({
      status: "Failed in forgot password",
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.trim().length < 6) {
      return res.status(400).json({
        status: "failed",
        message: "Password is required and must be at least 6 characters long",
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.json({
        status: "false",
        message: "invalid token or token has been expired",
      });
    }

    //update password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    res.json({
      status: "success",
      message: "reset successful",
    });

    await sendResetSuccessful(user.email);
    await user.save();
  } catch (error) {
    console.log("error in reset password , ", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.json({
    status: "success",
    message: "logout successful"
  })
};


module.exports = {
  signUpUser,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
  logout,
};
