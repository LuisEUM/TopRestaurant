const createError = require("http-errors");
const {RestaurantSetting, Restaurant} = require("../models");
const mongoose = require("mongoose");

module.exports.detail = (req, res, next) => {
  RestaurantSetting.find()
  .then(() => {
    Restaurant.findById(req.params.restaurantId)
    .populate("settings")
      .then((restaurant) => {
        return res.json(restaurant.settings) 
      })
    })
  .catch((error) => next(error));
}

module.exports.create = (req, res, next, restaurant) => {

  const restaurantSetting = {};
  delete restaurantSetting.restaurant;
  delete restaurantSetting.owner;

  restaurantSetting.restaurant = restaurant._id
  restaurantSetting.owner = req.user.id

  RestaurantSetting.create(restaurantSetting)
    .then((setting) => {  
        restaurant.settings.push(setting)
        restaurant.save();
        console.log("ESTE SERIA EL EXITO", restaurant)
        res.status(201).json(restaurant)
    })
    .catch((error) =>  res.status(400).json(error));
};


module.exports.update = (req, res, next) => {
  console.log(req)

  const data = req.body;
  delete data.restaurant;
  delete data.owner;

  const restaurantSetting = Object.assign(req.restaurantSettings, data);
  restaurantSetting
      .save()
      .then((restaurantSetting) => res.json(restaurantSetting))
      .catch(next);
}; 


