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

router.post("/login", loginController);

router.get("/test", (req, res) => {
  res.send("Auth route working");
});

module.exports = router;
