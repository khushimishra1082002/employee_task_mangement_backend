const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getAllUsersController = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const users = await User.find();

    res.json({
      total_Users: totalUsers,
      users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addUserController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, Email and Password are required",
      });
    }

  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }

    
    const newUser = new User({
      name,
      email,
      password, 
      role: role || "employee",
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteUserController = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully", id: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateuser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User details updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uploadproof = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { proof: req.file.path },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "File uploaded successfully",
      filePath: req.file.path,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get users by role (employee / admin / subadmin)
const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.query;

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    const users = await User.find({ role }).select("-password");

    res.json({
      total: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const changeUserRoleController = async (req, res) => {
  try {
    const { role } = req.body;
    const userId = req.params.id;

    // Validation
    const allowedRoles = ["admin", "subadmin", "employee"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Prevent self role downgrade (optional)
    if (req.user._id.toString() === userId) {
      return res
        .status(403)
        .json({ message: "You cannot change your own role" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Role updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports = {
  getAllUsersController,
  getSingleUser,
  addUserController,
  deleteUserController,
  updateuser,
  uploadproof,
  getUsersByRole,changeUserRoleController
};
