const express = require("express");
let multer = require("multer");
const router = express.Router();
const dataController = require("../controller/dataController");
const { upload } = require("../middleware/multer");
const { uploadJSONProducts } = require("../utils/readFile");

// /api/v1/data
router.post("/data", (req, res) => {
  upload.array("images", 5)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "Each file must be <= 2 MB" });
      }
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(500).json({ message: "Unknown error uploading files" });
    }
    dataController.createData(req, res);
  });
});

router.get("/data", dataController.getAllData);
router.delete("/data/delete/:id", dataController.DeleteData);
router.delete("/data/deleteImage/:id", dataController.DeleteImage);
router.post("/data/uploadData/",uploadJSONProducts)

module.exports = router;
