const express = require("express");
const {Auth, Restaurants, User, Review, Follow, Menu, Product, Like } = require('../routes');
const router = express.Router();

router.use('/', Auth);
router.use('/follow', Follow);
router.use('/like',Like)
router.use('/menu',Menu)
router.use('/product',Product)
router.use('/restaurants', Restaurants);
router.use('/review', Review);
router.use('/user', User);

module.exports = router;
