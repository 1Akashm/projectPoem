const mongoose = require("mongoose");

let dataModel = new mongoose.Schema({
    title: {
        type: String,
        required: [true,"cannot be empty"],
        unique: [true, "product already listed"]
    },
    description:{
        type: String,
        required: [true,"cannot be empty"],
    },
    price: {
        type: Number,
        required: [true,"cannot be empty"]
    },
    images: [
         {
      url: String,
      public_id: String,
      originalName: String
    },
    ]
},{
    timestamps: true
})

module.exports = mongoose.model("Data",dataModel);