// api/index.js
const serverless = require("serverless-http");
const app = require("../src/app");
const connectDB = require("../src/config/db");

connectDB(); // Connect to MongoDB

module.exports.handler = serverless(app);
