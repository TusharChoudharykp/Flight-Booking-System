const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

// Validate city creation request
function validateCreateRequest(req, res, next) {
  if (!req.body.name) {
    ErrorResponse.message = "Something went wrong while creating city";
    ErrorResponse.error = new AppError(
      ["City name not found in the incoming request in the correct form"],
      StatusCodes.BAD_REQUEST
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

// Validate city deletion request
function validateDeleteRequest(req, res, next) {
  if (!req.params.id) {
    ErrorResponse.message = "Something went wrong while deleting city";
    ErrorResponse.error = new AppError(
      ["City ID not provided in the request"],
      StatusCodes.BAD_REQUEST
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

// Validate city update request
function validateUpdateRequest(req, res, next) {
  if (!req.params.id) {
    ErrorResponse.message = "Something went wrong while updating city";
    ErrorResponse.error = new AppError(
      ["City ID not provided in the request"],
      StatusCodes.BAD_REQUEST
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (Object.keys(req.body).length === 0) {
    ErrorResponse.message = "Something went wrong while updating city";
    ErrorResponse.error = new AppError(
      ["No update data provided in the request"],
      StatusCodes.BAD_REQUEST
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

module.exports = {
  validateCreateRequest,
  validateDeleteRequest,
  validateUpdateRequest,
};
