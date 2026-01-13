const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // ye Cloudinary middleware

// Test upload route
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({
    success: true,
    fileUrl: req.file.path, // Cloudinary URL
  });
});

module.exports = router;
