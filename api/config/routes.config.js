const express = require("express");
const router = express.Router();
const secure = require("../middlewares/secure.mid.js");
const auth = require("../controllers/auth.controller.js");

router.post("/register", auth.register);
router.get("/profile", secure.isAuthenticated, auth.profile);
router.post("/authenticate", auth.authenticate);
router.delete("/logout", auth.logout);


module.exports = router;
