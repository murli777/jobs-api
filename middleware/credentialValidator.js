const { emailValidator, passwordValidator } = require("../helpers");
const { BadRequestError } = require("../errors/index");

const credentialValidator = (req, res, next) => {
  const { email, password } = req.body;

  const isValidEmail = emailValidator(email);
  const isValidPassword = passwordValidator(password);

  if (!isValidEmail || !isValidPassword) {
    return next(new BadRequestError("Invalid username or password!"));
  }
  next();
};

module.exports = credentialValidator;
