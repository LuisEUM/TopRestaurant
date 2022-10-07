const express = require("express");
const router = express.Router();
const secure = require("../middlewares/secure.mid.js");
const {likes} = require('../controllers');

router.get("/", secure.isAuthenticated, likes.userLikeList);
router.get("/:productId", secure.isAuthenticated, likes.userLikeBool);
router.post("/:productId", secure.isAuthenticated, likes.like);

module.exports = router;
