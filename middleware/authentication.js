const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next(new Unauthorised("Please provide the authorization token"));
  }

  const bearerToken = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(bearerToken, process.env.JWT_SECRET);
    const { name, userId } = payload;

    req.user = { userId, name };
    next();
  } catch (error) {
    return next(new UnauthenticatedError("Unauthorised"));
  }
};

module.exports = authentication;
