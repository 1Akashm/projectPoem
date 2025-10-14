const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../utils/cloudinary");

// Configure Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
  cloudinary:cloudinary,
  params: {
    folder: "products", // Cloudinary folder
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 800, height: 800, crop: "limit" }], // optional
    public_id: (req,file)=>file.fieldname + "-" + Date.now()
  },
});

const upload = multer({ storage,limits:{fileSize: 2*1024*1024} });

module.exports = { upload };
