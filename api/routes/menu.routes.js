const express = require("express");
const router = express.Router();
const secure = require("../middlewares/secure.mid.js");
const {menus} = require('../controllers');


router.post("/:restaurantId", secure.isAuthenticated ,  menus.create);


module.exports = router;
