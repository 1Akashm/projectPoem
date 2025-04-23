const express = require("express");
const authRoute = require("./route/web/auth.route");
const dotenv = require("dotenv");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
dotenv.config();

app.use("/api/v1/", authRoute);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("connected to mongodb");

  const port = process.env.PORT || 3000;
  app.listen(port,()=>{
    console.log(`listening on port ${port}`)
  })
});

