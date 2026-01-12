const express = require("express");
const router = express.Router();

const {
  getAllUsersController,
  getSingleUser,
  addUserController,
  deleteUserController,
  updateuser,
  uploadproof,getUsersByRole,changeUserRoleController
} = require("../../controller/userController");

const authtoken = require("../../middleware/authMiddleware");
const authorize = require("../../middleware/rolesMiddleware");
const upload = require("../../middleware/multerMiddleware");

router.get("/singleUser/:id", authtoken,getSingleUser);
router.get("/allUsers", authtoken, authorize(["admin"]), getAllUsersController);
router.post("/addUser",authtoken, addUserController); 
router.delete(
  "/deleteUser/:id",
  authtoken,
  authorize(["admin", "subadmin"]),
  deleteUserController
);
router.put("/editUser/:id", authtoken, updateuser);
router.post("/user/:id/upload", authtoken, upload.single("image"), uploadproof);
router.get(
  "/getUsersByRole",
  authtoken,
  authorize(["admin", "subadmin"]),
  getUsersByRole
);
router.put(
  "/change-role/:id",
  authtoken,
  authorize(["admin"]),
  changeUserRoleController
);


module.exports = router;
