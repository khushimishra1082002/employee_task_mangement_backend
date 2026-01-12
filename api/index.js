const express = require("express");
const cors = require("cors");

const connectDB = require("../src/config/db");

const app = express();

app.use(cors());
app.use(express.json());

// connect DB ONCE
let isConnected = false;
const connectOnce = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};
connectOnce();

// routes
app.use("/api/auth", require("../src/routes/admin/authRoutes"));
app.use("/api/user", require("../src/routes/admin/userRoutes"));
app.use("/api/task", require("../src/routes/admin/taskRoutes"));
app.use("/api/employeeTask", require("../src/routes/employee/employeeRoutes"));
app.use("/api/profile", require("../src/routes/profileRoutes"));

app.use("/uploads", express.static("uploads"));

app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "Backend working on Vercel 🚀" });
});

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found ❌" });
});

module.exports = app;
