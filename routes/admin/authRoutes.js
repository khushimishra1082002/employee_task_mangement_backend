const express = require("express");
const router = express.Router();
const {
  loginController,
  registerController,
  changePasswordController,
} = require("../../controller/authController");
const connectDB = require("../../config/db");
const upload = require("../../middleware/upload");
const authtoken = require("../../middleware/authMiddleware");

router.post("/register", upload.single("image"), registerController);

router.post("/login", loginController);

router.post("/change-password", authtoken, changePasswordController);

module.exports = router;
