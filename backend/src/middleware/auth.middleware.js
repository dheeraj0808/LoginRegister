const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Token missing"
    });
  }

  try {

    const decoded = jwt.verify(token, "secretkey");

    req.userId = decoded.id;

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Invalid token"
    });

  }

};

module.exports = verifyToken;