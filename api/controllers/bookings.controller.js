const createError = require("http-errors");
const {Booking} = require("../models");
const mongoose = require("mongoose");

module.exports.list = (req, res, next) => {
  Booking.find()
  .populate("client")
  .populate("table")
  .then((restaurant) => {
          
      return res.json(restaurant)
      
  })
  .catch((error) => next(error));
}
