const mongoose = require("mongoose");
const { Restaurant, User, Follow, Review } = require("../models");
const types = require('../data/types.restaurants.json')
const services = require('../data/services.restaurants.json')

module.exports.list = (req, res, next) => {
    Restaurant.find()
    .populate("user")
    .populate({
        path: "review",
        populate: {
          path: "user",
        },
      })
    .populate("follow")
    .populate("menus")
    .then((restaurant) => {
            
        return res.json(restaurant)
        
    })
    .catch((error) => next(error));
}


module.exports.create = (req, res, next) => {
const restaurant = req.body;
delete restaurant.user;
delete restaurant.menus;
delete restaurant.views;

restaurant.user = req.user.id;

Restaurant.create(restaurant)
    .then((restaurant) => res.status(201).json(restaurant))
    .catch(next);
}


module.exports.detail = (req, res, next) => {
    Restaurant.findById(req.params.id)
    .populate("user")
    .populate({
        path: "review",
        populate: {
          path: "user",
        },
      })
    .populate("follow")
    .populate("menus")
    .then((restaurant) => {
        if (restaurant) {
            res.json(restaurant);
        } else {
            next(createError(404, "Restaurant not found"));
        }
    })
    .catch((error) => next(error));
};

module.exports.update = (req, res, next) => {
    const data = req.body;
    delete data.views;
    delete data.user;
    delete data.menus;

    const restaurant = Object.assign(req.restaurant, data);

    restaurant
        .save()
        .then((restaurant) => res.json(restaurant))
        .catch(next);
};

module.exports.delete = (req, res, next) => {
    Restaurant.deleteOne({ _id: req.restaurant.id })
      .then(() => res.status(204).send())
      .catch(next);
  };