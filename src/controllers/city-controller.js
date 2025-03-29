const { StatusCodes } = require("http-status-codes");

const { CityService } = require("../services");

const ErrorResponse = require("../utils/common/error-response");
const SuccessResponse = require("../utils/common/success-response");

// CREATE City
async function createCity(req, res) {
  try {
    const city = await CityService.createCity({
      name: req.body.name,
    });
    SuccessResponse.data = city;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

// DELETE City by ID
async function deleteCity(req, res) {
  try {
    await CityService.deleteCity(req.params.id);
    SuccessResponse.message = "City deleted successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

// UPDATE City by ID (PATCH)
async function updateCity(req, res) {
  try {
    const updatedCity = await CityService.updateCity(req.params.id, req.body);
    SuccessResponse.data = updatedCity;
    SuccessResponse.message = "City updated successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

module.exports = {
  createCity,
  deleteCity,
  updateCity,
};
