const express = require("express");

const connectDB = require("./src/config/db");

const app = express();

require("dotenv").config();

const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

connectDB().then(() =>
  console
    .log("database connected")
    .catch((err) => console.log("datatbse err", err))
);

app.use("/api/auth", require("../routes/admin/authRoutes"));
app.use("/api/user", require("../routes/admin/userRoutes"));
app.use("/api/task", require("../routes/admin/taskRoutes"));
app.use("/api/employeeTask", require("../routes/employee/employeeRoutes"));
app.use("/api/profile", require("../routes/profileRoutes"));

app.get("/", (req, res) => {
  res.send("successful");
});

// Catch-all 404 route (important!)
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found ❌" });
});

module.exports = app;
