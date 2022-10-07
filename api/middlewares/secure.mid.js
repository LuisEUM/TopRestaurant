const createError = require('http-errors');
const {Restaurant, Review, Product} = require('../models');
const Menu = require('../models/menu.model');

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
        next(createError(404, "Review not found"));
      }
    })
    .catch(next);
};

module.exports.ismenuOwnedByUser = (req, res, next) => {
  const { id } = req.params;

  Menu.findById(id)
    .then((menu) => {
      if (menu) {
        if (menu.menuOwner == req.user.id) {
          req.menu = menu;
          next();
        } else {
          next(createError(403, "access denied"));
        }
      } else {
        next(createError(404, "Menu not found"));
      }
    })
    .catch(next);
};

module.exports.isproductOwnedByUser = (req, res, next) => {
  const { id } = req.params;

  Product.findById(id)
    .then((product) => {
      if (product) {
        if (product.productOwner == req.user.id) {
          req.product = product;
          next();
        } else {
          next(createError(403, "access denied"));
        }
      } else {
        next(createError(404, "Menu not found"));
      }
    })
    .catch(next);
};