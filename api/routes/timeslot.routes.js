const express = require("express");
const router = express.Router();
const secure = require("../middlewares/secure.mid.js");
const {timeslots} = require('../controllers');

router.post("/:id", secure.isAuthenticated, secure.isRestaurantOwnedByUser , timeslots.create);
router.get("/:id", secure.isAuthenticated, timeslots.detail);
router.patch("/:id", secure.isAuthenticated, secure.isTimeSlotOwnedByUser, timeslots.update);


module.exports = router;
