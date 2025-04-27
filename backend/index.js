const express = require("express");
const authRoute = require("./route/web/auth.route");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
dotenv.config();

app.use("/api/v1/", authRoute);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("connected to mongodb");

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
