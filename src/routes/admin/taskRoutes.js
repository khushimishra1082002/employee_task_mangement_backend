const express = require("express");
const { getAllTasksController,assignTaskController,getSingleTaskController,
    updatetaskController,deleteTaskController
 } = require("../../controller/taskController");
const authtoken = require("../../middleware/authMiddleware");
const roles = require("../../middleware/rolesMiddleware");
const router = express.Router();

router.get("/getAllTask", getAllTasksController);
router.get('/getSingleTask/:id',getSingleTaskController);
router.post('/asignTask', authtoken, roles(['admin']), assignTaskController);  
router.put('/updatetask/:id',authtoken, roles(['admin']),updatetaskController);
router.delete('/deletetask/:id',authtoken, roles(['admin']), deleteTaskController); 

module.exports = router;
