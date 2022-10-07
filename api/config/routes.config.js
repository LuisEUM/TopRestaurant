const express = require("express");
const {Auth, Restaurants, User, Review, Follow, Menu, Product, Like, Bookings, Timeslot, Tables } = require('../routes');
const router = express.Router();

router.use('/', Auth);
router.use('/follow', Follow);
router.use('/like',Like)
router.use('/menu',Menu)
router.use('/product',Product)
router.use('/restaurants', Restaurants);
router.use('/review', Review);
router.use('/user', User);
router.use('/bookings', Bookings);
router.use('/tables', Tables);
router.use('/timeslots', Timeslot);

module.exports = router;
