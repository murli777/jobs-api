/**
 * Handles errors in controllers by logging them and sending appropriate response
 * @param {Error} error - The error object
 * @param {Response} res - Express response object
 * @param {string} errorId - The error identifier
 * @param {string} userMessage - Message to show to the user
 */

const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("../errors");
const errorHandler = (error, req, res, next) => {
  const timestamp = new Date().toISOString();

  if (error instanceof CustomAPIError) {
    console.error({
      error,
      stack: error.stack,
      timestamp,
    });

    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  console.error({
    message: error.message,
    stack: error.stack,
    timestamp,
  });

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Something went wrong. Please try again later.",
  });
};

module.exports = errorHandler;
