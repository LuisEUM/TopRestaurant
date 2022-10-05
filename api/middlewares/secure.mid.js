const createError = require('http-errors');
const Restaurant = require('../models/restaurant.model');

module.exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    next(createError(401))
  }
}

module.exports.restaurantIsOwnedByUser = (req, res, next) => {
  const { id } = req.params;
  Restaurant.findById(id)
    .then((restaurant) => {
      if (restaurant?.user == req.user?.id) {
        req.restaurant = restaurant;
        next();
      } else if (restaurant) {
        next(createError(403, "access denied"));
      } else {
        next(createError(404, "restaurant not found"));
      }
    })
    .catch(next);
};