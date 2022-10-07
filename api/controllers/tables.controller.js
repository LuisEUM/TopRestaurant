const createError = require("http-errors");
const {Table} = require("../models");
const mongoose = require("mongoose");

module.exports.list = (req, res, next) => {
  Table.find()
  .populate("timeslots")
  .populate("bookings")
  .populate("restaurant")
  .then((restaurant) => {
          
      return res.json(restaurant)
      
  })
  .catch((error) => next(error));
}

