// const express = require("express");
// const router = express.Router();
// const {
//   registerController,
//   loginController,
//   changePasswordController
// } = require("../../controller/authController");
// const upload = require("../../middleware/multerMiddleware")
// const authtoken = require("../../middleware/authMiddleware");

// // REGISTER
// router.post("/register", upload.single("image"), registerController);

// // LOGIN
// router.post("/login", loginController);

// // 🔐 Change password (protected)
// router.post("/change-password", authtoken, changePasswordController);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { loginController } = require("../../controller/authController");
const connectDB = require("../../config/db")

router.post("/login", loginController);

router.get("/test", (req, res) => {
  res.send("Auth route working");
});

router.get("/db-test", async (req, res) => {
  try {
    await connectDB();
    res.send("DB OK");
  } catch (e) {
    res.status(500).send("DB FAIL");
  }
});

router.post("/upload", upload.single("file"), (req, res) => {
  res.json({
    fileUrl: req.file.path, // 🔥 Cloudinary URL
  });
});

app.get("/api/check-env", (req, res) => {
  res.json({
    cloud: !!process.env.CLOUD_NAME,
    key: !!process.env.API_KEY,
    secret: !!process.env.API_SECRET,
  });
});

router.post("/test-upload", upload.single("file"), (req, res) => {
  res.json({
    success: true,
    url: req.file.path,
  });
});


module.exports = router;
