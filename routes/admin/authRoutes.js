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
const {
  loginController,
  registerController,changePasswordController
} = require("../../controller/authController");
const connectDB = require("../../config/db");
const upload = require("../../middleware/upload"); // ye Cloudinary middleware
const authtoken = require("../../middleware/authMiddleware");


router.post("/register", upload.single("image"), registerController);

router.post("/login", loginController);

router.post("/change-password", authtoken, changePasswordController);


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

module.exports = router;
