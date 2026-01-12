// // const app = require("./src/app");
// // const connectDB = require("./src/config/db");
// // require("dotenv").config();

// // connectDB();

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () =>
// //   console.log(`Server running on port ${PORT}`)
// // );
// // server.js
// const app = require("./src/app");
// const connectDB = require("./src/config/db");
// require("dotenv").config();

// connectDB();

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// server.js
const app = require("./src/app");
const connectDB = require("./src/config/db");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log(err));
