const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const jwtSecret = process.env.JWT_secret_key;
  try {
    if (!req.headers && req.headers.authorization !== undefined && req.headers.authorization !== "") {
      res.status(404);
    }
    let token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // Attach the decoded user to the request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticate;