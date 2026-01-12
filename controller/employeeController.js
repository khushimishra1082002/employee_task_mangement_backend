const Task = require("../models/task");

// Get all tasks assigned to the logged-in employee
const getMyTasksController = async (req, res) => {
    console.log("k",req);
    
  try {
    // req.user._id comes from auth middleware (logged-in employee)
    const employeeId = req.user._id;

    const tasks = await Task.find({ assigned_to: employeeId })
      .populate("assigned_to", "name email") // optional: populate employee info
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      total: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error("EMPLOYEE TASK ERROR:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


const employeeUpdateTaskStatusController = async (req, res) => {
  try {
    const { id } = req.params; // Task ID
    const { status } = req.body; // New status

    // Update only status field
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true } // updated task return karega
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task status updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getMyTasksController,employeeUpdateTaskStatusController }
