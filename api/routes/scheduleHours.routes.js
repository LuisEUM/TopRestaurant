const express = require("express");
const router = express.Router();
const secure = require("../middlewares/secure.mid.js");
const {schedulesHours} = require('../controllers');

router.post("/:id", secure.isAuthenticated, secure.isScheduleOwnedByUser ,schedulesHours.create);
router.get("/:scheduleId", secure.isAuthenticated, schedulesHours.detail);
router.patch("/:id", secure.isAuthenticated, secure.isScheduleHourOwnedByUser, schedulesHours.update);
// router.delete(
//     "/:id",
//     secure.isAuthenticated,
//     secure.isScheduleOwnedByUser,
//     schedulesHours.delete
//   );

module.exports = router;
