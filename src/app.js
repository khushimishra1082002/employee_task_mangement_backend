const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/admin/authRoutes"));

// routes
app.use("/api/user", require("./routes/admin/userRoutes"));

app.use("/api/task", require("./routes/admin/taskRoutes"));

app.use("/api/employeeTask", require("./routes/employee/employeeRoutes"));

app.use("/api/profile", require("./routes/profileRoutes"));

app.use("/uploads", express.static("uploads"));

app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is working 🚀",
  });
});

module.exports = app;
