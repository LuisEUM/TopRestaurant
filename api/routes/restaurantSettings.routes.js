const express = require("express");
const router = express.Router();
const secure = require("../middlewares/secure.mid.js");
const {restaurantSettings} = require('../controllers');

router.get("/:restaurantId", secure.isAuthenticated, restaurantSettings.detail);
router.patch("/:id", secure.isAuthenticated, secure.isRestaurantSettingsOwnedByUser, restaurantSettings.update);

module.exports = router;
