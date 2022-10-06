const express = require("express");
const router = express.Router();
const secure = require("../middlewares/secure.mid.js");
const {follow} = require('../controllers');

router.get("/:restaurantId", secure.isAuthenticated, follow.userFollowList);
router.post("/:restaurantId", secure.isAuthenticated, follow.follow);

module.exports = router;
