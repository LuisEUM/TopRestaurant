const express = require("express");
const router = express.Router();
const secure = require("../middlewares/secure.mid.js");
const {auth} = require('../controllers');
const upload = require("../config/multer.config")

router.post("/register", auth.register);
router.get("/profile",  auth.profile);
router.patch("/update",upload.single('image'), secure.isAuthenticated, auth.update);
router.post("/authenticate", auth.authenticate);
router.delete("/logout", auth.logout);

module.exports = router;
