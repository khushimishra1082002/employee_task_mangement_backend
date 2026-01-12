// const jwt = require("jsonwebtoken");

// const authtoken = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization || req.headers.Authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         message: "Access denied. Token missing"
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // decoded = { id, role, name, iat, exp }
//     req.user = decoded;

//     next();
//   } catch (error) {
//     return res.status(403).json({
//       message: "Invalid or expired token"
//     });
//   }
// };

// module.exports = authtoken;


const jwt = require("jsonwebtoken");

const authtoken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access denied. Token missing"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 FIX HERE
    req.user = {
      _id: decoded.id,
      role: decoded.role,
      name: decoded.name
    };

    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token"
    });
  }
};

module.exports = authtoken;
