const Task = require("../models/task");

const getAllTasksController = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();

    const tasks = await Task.find()
      .populate("assigned_to", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      total_Tasks: totalTasks,
      tasks,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const assignTaskController = async (req, res) => {
  try {
    const { title, description, status, assigned_to } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      assigned_to,
    });

    const populatedTask = await Task.findById(task._id).populate(
      "assigned_to",
      "name email role"
    );

    res.status(201).json({
      message: "Task Assigned",
      task: populatedTask,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getSingleTaskController = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id).populate(
      "assigned_to",
      "name email role"
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updatetaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true } // updated data return karega
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.params;

    // Task delete kar rahe hain
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task deleted successfully",
      id: deletedTask._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { getAllTasksController ,assignTaskController,
  getSingleTaskController,updatetaskController,deleteTaskController};
