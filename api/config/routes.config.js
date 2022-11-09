const express = require("express");
const createError = require("http-errors");
const {Auth, Restaurants, User, Review, Follow, Menu, Product, Like, Bookings, Timeslot, Tables, Zones, Schedules, RestaurantSettings, SchedulesHours } = require('../routes');
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
router.use('/zones', Zones);
router.use('/schedules', Schedules);
router.use('/schedule_hours', SchedulesHours);
router.use('/restaurant_settings', RestaurantSettings);



router.use((req, res, next) => next(createError(404, "Route not found")));


module.exports = router;
