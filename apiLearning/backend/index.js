let express = require("express");
let app = express();
let mongoose = require("mongoose");
let cors = require("cors");
let env = require("dotenv");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
env.config();


let routerData = require("./router/dataRouter");

app.get("/", (req, res) => {
  res.send({
    message: "Home Page",
  });
});

app.use("/api/v1/product", routerData);

let port = process.env.PORT || 3000;
let uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");

    // ✅ Correct way to start the server
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
