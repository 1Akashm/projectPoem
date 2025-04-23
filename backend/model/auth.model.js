const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{
        required: true,
        unique: true,
        type: String,
    },
    name: {
        required: true,
        type: String,
    },
    password:{
        required: true,
        type: String,
    },
    lastLogin:{
        type: Date,
        default: Date.now
    },
    isAccountVerified:{
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
},{
    timestamps:true
});

const userModel = mongoose.model("userModel",userSchema);

module.exports = userModel;