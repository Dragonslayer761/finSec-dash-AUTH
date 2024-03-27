const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_secret_key;

const authenticate = (req, res, next) => {
  if (!req.body.token) {
    res.status(404);
  }
  try {
    const decoded = jwt.verify(req.body.token, jwtSecret);
    req.user = decoded; // Attach the decoded user to the request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticate;