// const app = require("./src/app");
// const connectDB = require("./src/config/db");
// require("dotenv").config();

// connectDB();

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const cors = require("cors");

const app = express();

const connectDB = require("./src/config/db");

app.use(cors());
app.use(express.json());

connectDB().then(() =>
  console.log("database connceted")
).catch((err) => console.log(err))

app.get("/", (req, res) => {
  res.send("employee");
});

app.use("/api/auth", require("./src/routes/admin/authRoutes"));
app.use("/api/user", require("./src/routes/admin/userRoutes"));
app.use("/api/task", require("./src/routes/admin/taskRoutes"));
app.use("/api/employeeTask", require("./src/routes/employee/employeeRoutes"));
app.use("/api/profile", require("./src/routes/profileRoutes"));

app.use("/uploads", express.static("uploads"));

// Catch-all 404 route (important!)
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found ❌" });
});

module.exports = app;
