const express = require("express");
const router = express.Router();
const secure = require("../middlewares/secure.mid.js");
const bookingMid = require("../middlewares/booking.mid.js");
const {bookings} = require('../controllers');

//para create
router.post("/create/:id", secure.isAuthenticated, bookingMid.confirmHour, bookings.create);

//id of the restaurant
router.post("/:id", secure.isAuthenticated, bookingMid.getHours, bookings.getHours)

//list
router.get("/", secure.isAuthenticated, bookings.getbookings);
//id of the booking
router.get("/detail/:id", secure.isAuthenticated, bookings.getBookingsDetail);

//patch id booking
//router.patch("/:id",secure.isAuthenticated, secure.isBookingOwnedByUser, bookingMid.confirmHour, bookings.update);

//patch notes patch
router.patch("/:id",secure.isAuthenticated, secure.isBookingOwnedByUser, bookings.updateNote);


module.exports = router;
