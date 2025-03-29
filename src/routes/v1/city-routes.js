const express = require("express");

const { CityController } = require("../../controllers");
const { CityMiddlewares } = require("../../middlewares");

const router = express.Router();

// CREATE City
router.post(
  "/",
  CityMiddlewares.validateCreateRequest,
  CityController.createCity
);

// DELETE City by ID
router.delete("/:id", CityController.deleteCity);

// UPDATE (PATCH) City by ID
router.patch("/:id", CityController.updateCity);

module.exports = router;
