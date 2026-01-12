// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  getMyProfile,
  updateMyProfile,
} = require("../controller/profileController");
const authtoken = require("../middleware/authMiddleware");
const upload = require("../middleware/multerMiddleware");


router.get("/me", authtoken, getMyProfile);
router.put("/updateProfile", authtoken,upload.single("image"), updateMyProfile);

module.exports = router;
