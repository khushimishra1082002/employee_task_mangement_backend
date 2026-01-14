const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/admin/authRoutes");
const userRoutes = require("./routes/admin/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const taskRoutes = require("./routes/admin/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use("/api/profile", profileRoutes);
app.use("/api/task", taskRoutes);

app.use("/api", require("./routes/upload"));

// test route
app.get("/", (req, res) => {
  res.send("API working");
});

// DB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err.message));

module.exports = app; 
