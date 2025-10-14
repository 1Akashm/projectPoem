const fs = require("fs");
const Product = require("../model/dataModel");
const cloudinary = require("cloudinary").v2;

exports.uploadJSONProducts = async (req, res) => {
  try {
    // 1. Read JSON file
    const jsonData = JSON.parse(
      fs.readFileSync("C:/Users/User/Desktop/mobile_products_200.json", "utf8")
    );

    const savedProducts = [];

    for (let product of jsonData) {
      // 2. Check for duplicate title
      const exists = await Product.findOne({ title: product.title });
      if (exists) {
        console.log(`Skipped duplicate product: ${product.title}`);
        continue; // skip duplicates
      }

      // 3. Upload images to Cloudinary in parallel
      const uploadedImages = await Promise.all(
        product.images.map(async (url) => {
          try {
            const result = await cloudinary.uploader.upload(url, {
              folder: "products",
              public_id: product.title.replace(/\s+/g, "_") + "_" + Date.now(),
            });

            return {
              url: result.secure_url,
              public_id: result.public_id,
              originalName: url.split("/").pop(),
            };
          } catch (err) {
            console.log(`Error uploading image ${url}: ${err.message}`);
            return null; // skip failed uploads
          }
        })
      );

      // Remove failed uploads
      const imagesForProduct = uploadedImages.filter(Boolean);

      // 4. Save product to MongoDB
      const newProduct = new Product({
        title: product.title,
        description: product.description,
        price: product.price,
        images: imagesForProduct,
      });

      try {
        const saved = await newProduct.save();
        savedProducts.push(saved);
        console.log(`Saved product: ${product.title}`);
      } catch (err) {
        console.log(`Error saving product ${product.title}: ${err.message}`);
        // skip duplicates or validation errors
      }
    }

    // 5. Send response
    res.status(200).json({
      success: true,
      message: "Products uploaded and saved successfully",
      count: savedProducts.length,
      data: savedProducts,
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
