const credentialValidator = require("./credentialValidator");
const authentication = require("./authentication");
const errorHandler = require("./error-handler");
const notFound = require("./not-found");

module.exports = {
  credentialValidator,
  authentication,
  errorHandler,
  notFound,
};
