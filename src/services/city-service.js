const { StatusCodes } = require("http-status-codes");

const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const cityRepository = new CityRepository();

// CREATE city
async function createCity(data) {
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];

      error.errors.forEach((err) => {
        explanation.push(err.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new city object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

// Delete city by ID
async function deleteCity(cityId) {
  try {
    const deletedCity = await cityRepository.destroy(cityId);

    if (!deletedCity) {
      throw new AppError("City not found", StatusCodes.NOT_FOUND);
    }

    return { message: "City deleted successfully" };
  } catch (error) {
    throw new AppError("Cannot delete city", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

// Update (patch) city by ID
async function updateCity(cityId, updateData) {
  try {
    const city = await cityRepository.get(cityId);

    if (!city) {
      throw new AppError("City not found", StatusCodes.NOT_FOUND);
    }

    const updatedCity = await city.update(updateData);
    return updatedCity;
  } catch (error) {
    throw new AppError("Cannot update city", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  createCity,
  deleteCity,
  updateCity,
};
