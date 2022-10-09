const createError = require('http-errors');
const { tables } = require('../controllers');
const {Restaurant, Review, Product, Zone, Table, Schedule} = require('../models');
const Menu = require('../models/menu.model');

module.exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    next(createError(401))
  }
}

const checkUser = (value, name, req, next) =>{
  if (value?.owner == req.user?.id) {
    Object.assign(req, { [name]: value });
    next();
  } else if (value) {
    next(createError(403, "access denied"));
  } else {
    next(createError(404, `${value} not found`));
  }
}

module.exports.isRestaurantOwnedByUser = (req, res, next) => {
  const { id } = req.params;
  Restaurant.findById(id)
    .then((restaurant) => {
      checkUser(restaurant, 'restaurant', req, next)
    })
    .catch(next);
};

module.exports.isReviewOwnedByUser = (req, res, next) => {
  const { reviewId } = req.params;

  Review.findById(reviewId)
    .then((review) => {
        checkUser(review, 'review', req, next)
    })
    .catch(next);
};

module.exports.ismenuOwnedByUser = (req, res, next) => {
  const { id } = req.params;

  Menu.findById(id)
    .then((menu) => {
      checkUser(menu, 'menu', req, next)
    })
    .catch(next);
};

module.exports.isproductOwnedByUser = (req, res, next) => {
  const { id } = req.params;

  Product.findById(id)
    .then((product) => {
      checkUser(product, 'product', req, next)
    })
    .catch(next);
};


module.exports.isZoneOwnedByUser = (req, res, next) => {
  const { id } = req.params;

  Zone.findById(id)
    .then((zone) => {
      checkUser(zone, 'zone', req, next)
    })
    .catch(next);
};

module.exports.isTableOwnedByUser = (req, res, next) => {
  const { id } = req.params;

  Table.findById(id)
    .then((table) => {
      checkUser(table, 'table', req, next)
    })
    .catch(next);
};

module.exports.isScheduleOwnedByUser = (req, res, next) => {
  const { id } = req.params;

  Schedule.findById(id)
    .then((schedule) => {
      checkUser(schedule, 'schedule', req, next)
    })
    .catch(next);
};