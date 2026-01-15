const express = require("express");
const { getMyTasksController,employeeUpdateTaskStatusController } = 
require("../../controller/employeeController");
const authtoken = require("../../middleware/authMiddleware");

const router = express.Router();

router.get("/myTask", authtoken, getMyTasksController);
router.put('/employeeupdateTaskStatus/:id',authtoken, employeeUpdateTaskStatusController);

module.exports = router;
