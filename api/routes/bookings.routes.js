const express = require("express");
const router = express.Router();
const secure = require("../middlewares/secure.mid.js");
const {bookings} = require('../controllers');

router.post("/", secure.isAuthenticated, bookings.create);
router.get("/", secure.isAuthenticated, bookings.list);
// router.get("/:id", secure.isAuthenticated, bookings.detail);
// router.patch("/:id", secure.isAuthenticated, secure.isRestaurantOwnedByUser, bookings.update);
// router.delete(
//     "/:id",
//     secure.isAuthenticated,
//     secure.isRestaurantOwnedByUser,
//     bookings.delete
//   );

module.exports = router;
