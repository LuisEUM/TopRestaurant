const express = require("express");
const router = express.Router();
const secure = require("../middlewares/secure.mid.js");
const {follow} = require('../controllers');

router.get("/", secure.isAuthenticated, follow.userFollowList);
router.get("/:restaurantId", secure.isAuthenticated, follow.userFollowBool);
router.post("/:restaurantId", secure.isAuthenticated, follow.follow);

module.exports = router;
