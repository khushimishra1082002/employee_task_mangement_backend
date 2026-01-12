// const express = require("express");
// const app = express();
// const connectDB = require("./config/db");
// const authRoutes = require("./routes/admin/authRoutes");
// const userRoutes = require("./routes/admin/userRoutes");
// const taskRoutes = require("./routes/admin/taskRoutes");
// const employeeRoutes = require("./routes/employee/employeeRoutes");
// const profileRoutes = require("./routes/profileRoutes");
// require("dotenv").config();

// const cors = require("cors");
// app.use(cors());
// app.use(express.json());

// app.use("/uploads", express.static("uploads"));

// connectDB()
//   .then(() => console.log("database connceted"))
//   .catch((err) => console.log(err));

// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/task", taskRoutes);
// app.use("/api/employeeTask", employeeRoutes);
// app.use("/api/profile", profileRoutes);

// app.get("/", (req, res) => {
//   res.send("welcome");
// });

// module.exports = app

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API working");
});

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err.message));

module.exports = app; // 🔥 MUST
