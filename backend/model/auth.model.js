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
      ExpireAt: {
        type: Date,
      },
    isAccountVerified:{
        type: Boolean,
        default: false,
    },

},{
    timestamps:true
});

const userModel = mongoose.model("userModel",userSchema);

module.exports = userModel;