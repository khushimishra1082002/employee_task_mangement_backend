const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); 

router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({
    success: true,
    fileUrl: req.file.path, 
  });
});

module.exports = router;
