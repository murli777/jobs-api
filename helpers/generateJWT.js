const jwt = require("jsonwebtoken");
const generateJWT = (userId, name) => {
  const jwtSecret = process.env.JWT_SECRET;
  const token = jwt.sign({ userId, name }, jwtSecret, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  return token;
};

module.exports = generateJWT;
