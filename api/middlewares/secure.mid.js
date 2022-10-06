const createError = require('http-errors');
const {Restaurant, Review} = require('../models');

module.exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    next(createError(401))
  }
}

module.exports.isRestaurantOwnedByUser = (req, res, next) => {
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

module.exports.isreviewOwnedByUser = (req, res, next) => {
  const { reviewId } = req.params;

  console.log(req.params)

  Review.findById(reviewId)
    .then((review) => {
      if (review) {
        if (review.user == req.user.id) {
          req.review = review;
          next();
        } else {
          next(createError(403, "access denied"));
        }
      } else {
        next(createError(404, "Stream not found"));
      }
    })
    .catch(next);
};