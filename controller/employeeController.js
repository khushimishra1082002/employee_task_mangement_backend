const Task = require("../models/task");

const getMyTasksController = async (req, res) => {
  try {
    const employeeId = req.user._id;

    const tasks = await Task.find({ assigned_to: employeeId })
      .populate("assigned_to", "name email")
      .sort({ createdAt: -1 });

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
    const { id } = req.params;
    const { status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true }
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

module.exports = { getMyTasksController, employeeUpdateTaskStatusController };
