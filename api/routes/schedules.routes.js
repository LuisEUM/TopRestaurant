const express = require("express");
const router = express.Router();
const secure = require("../middlewares/secure.mid.js");
const {schedules} = require('../controllers');

router.post("/:restaurantId", secure.isAuthenticated, schedules.create);
router.get("/:restaurantId", secure.isAuthenticated, schedules.detail);
router.patch("/:id", secure.isAuthenticated, secure.isScheduleOwnedByUser, schedules.update);
router.delete(
    "/:id",
    secure.isAuthenticated,
    secure.isScheduleOwnedByUser,
    schedules.delete
  );

module.exports = router;
