const express = require("express");
const router = express.Router();
const secure = require("../middlewares/secure.mid.js");
const {users} = require('../controllers');

router.get("/favorites", secure.isAuthenticated, users.favorites);

module.exports = router;