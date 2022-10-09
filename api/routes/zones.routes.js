const express = require("express");
const router = express.Router();
const secure = require("../middlewares/secure.mid.js");
const {zones} = require('../controllers');

router.post("/:restaurantId", secure.isAuthenticated, zones.create);
router.get("/:restaurantId", secure.isAuthenticated, zones.detail);
router.patch("/:id", secure.isAuthenticated, secure.isZoneOwnedByUser, zones.update);
router.delete(
    "/:id",
    secure.isAuthenticated,
    secure.isZoneOwnedByUser,
    zones.delete
  );

module.exports = router;
