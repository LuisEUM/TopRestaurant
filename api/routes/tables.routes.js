const express = require("express");
const router = express.Router();
const secure = require("../middlewares/secure.mid.js");
const {tables} = require('../controllers');

// router.post("/", secure.isAuthenticated, restaurants.create);
router.get("/", secure.isAuthenticated, tables.list);
// router.get("/:id", secure.isAuthenticated, restaurants.detail);
// router.patch("/:id", secure.isAuthenticated, secure.isRestaurantOwnedByUser, restaurants.update);
// router.delete(
//     "/:id",
//     secure.isAuthenticated,
//     secure.isRestaurantOwnedByUser,
//     restaurants.delete
//   );

module.exports = router;
