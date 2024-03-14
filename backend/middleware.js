const jwt = require("jsonwebtoken");
const config = require("./config");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log("authHeader", authHeader);
  const token = authHeader || authHeader.split(" ")[0];
  if (!token) {
    return res.send("Token doesn't exist").status(400);
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    // console.log("decoded", decoded);
    req.userId = decoded.userId;
    // comsole.log("middleware return ", req.userId);

    next();
  } catch (error) {
    return res.send(error).status(400);
  }
};

module.exports = authMiddleware;
