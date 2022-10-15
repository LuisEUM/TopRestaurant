const express = require("express");
const router = express.Router();
const secure = require("../middlewares/secure.mid.js");
const {menus} = require('../controllers');


router.get("/", secure.isAuthenticated ,  menus.list);
router.get("/:id", secure.isAuthenticated ,  menus.detail);
//restarant id in the create
router.post("/:id", secure.isAuthenticated , secure.isRestaurantOwnedByUser , menus.create);
router.patch("/:id", secure.isAuthenticated ,secure.ismenuOwnedByUser,  menus.update);
router.delete("/:id", secure.isAuthenticated ,secure.ismenuOwnedByUser,  menus.delete);


module.exports = router;
