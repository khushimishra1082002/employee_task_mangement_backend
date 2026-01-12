// api/index.js
const serverless = require("serverless-http");
const app = require("../src/app");
const connectDB = require("../src/config/db");

require("dotenv").config();

connectDB(); // connect MongoDB in serverless function

module.exports.handler = serverless(app);
