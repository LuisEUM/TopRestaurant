const express = require("express");
const {Auth, Restaurants} = require('../routes');
const router = express.Router();

router.use('/', Auth);
router.use('/restaurants', Restaurants);

module.exports = router;
