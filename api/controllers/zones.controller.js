const createError = require("http-errors");
const {Zone, Restaurant} = require("../models");
const mongoose = require("mongoose");

module.exports.detail = (req, res, next) => {
  Zone.find()
  .then((zone) => {
    Restaurant.findById(req.params.restaurantId)
    .populate("zones")
      .then((restaurant) => {
        return res.json(restaurant.zones) 
      })
    })
  .catch((error) => next(error));
}

module.exports.create = (req, res, next) => {

  const zone = req.body;
  delete zone.restaurant;
  delete zone.timeslots;
  delete zone.tables;
  delete zone.bookings;
  delete zone.owner;

  zone.restaurant = req.params.restaurantId
  zone.owner = req.user.id

  Zone.create(zone)
    .then((zone) => {
      console.log(req.user.id, zone)

      Restaurant.findById(zone.restaurant)
      .then((restaurant) => { 
        restaurant.zones.push(zone._id)
        restaurant.save();
        res.status(201).json(zone)
      })
      .catch((error) =>  res.status(400).json(error));
    })
    .catch((error) =>  res.status(400).json(error));
};


module.exports.update = (req, res, next) => {
  const data = req.body;
  delete data.restaurant;
  delete data.owner;
  delete data.tables;
  delete data.bookings;
  delete data.timeslots;

  const zone = Object.assign(req.zone, data);

  zone
      .save()
      .then((zone) => res.json(zone))
      .catch(next);
};


module.exports.delete = (req, res, next) => {
  console.log(req.zone)
  Restaurant.findById(req.zone.restaurant)
    .then((restaurant) => {
      const restaurantZones = restaurant.zones
      restaurantZones.splice(restaurantZones.indexOf(req.zone._id), 1);
      restaurant.save();
    })
    .then(() => {
      Zone.deleteOne({ _id: req.zone._id })
      .then(() => res.status(204).send())
      .catch(next);
    })
    .catch(next);
};