const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const jwtSecret = process.env.JWT_secret_key;
  try {
    if (!req.headers && req.headers.authorization !== undefined && req.headers.authorization !== "") {
      res.status(404);
    }
    let token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, jwtSecret);
    req.body.userDetails = decoded; // Attach the decoded user to the request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const generateToken = (content) => {
  const token = jwt.sign(content,process.env.JWT_secret_key,{algorithm : 'HS256',expiresIn : process.env.JWT_EXPIRY});
  return token;
}

module.exports = {authenticate,generateToken};