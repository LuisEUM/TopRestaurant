const express = require("express");
const {Auth, Restaurants, User, Review, Follow, Menu } = require('../routes');
const router = express.Router();

router.use('/', Auth);
router.use('/restaurants', Restaurants);
router.use('/review', Review);
router.use('/user', User);
router.use('/follow', Follow);
router.use('/menu',Menu)

module.exports = router;
