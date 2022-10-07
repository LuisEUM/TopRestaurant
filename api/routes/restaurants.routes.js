const express = require("express");
const router = express.Router();
const secure = require("../middlewares/secure.mid.js");
const {restaurants} = require('../controllers');

router.post("/", secure.isAuthenticated, restaurants.create);
router.get("/", secure.isAuthenticated, restaurants.list);
router.get("/:id", secure.isAuthenticated, restaurants.detail);
router.patch("/:id", secure.isAuthenticated, secure.isRestaurantOwnedByUser, restaurants.update);
router.delete(
    "/:id",
    secure.isAuthenticated,
    secure.isRestaurantOwnedByUser,
    restaurants.delete
  );

module.exports = router;
