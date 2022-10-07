const createError = require("http-errors");
const {Timeslot} = require("../models");
const mongoose = require("mongoose");


module.exports.list = (req, res, next) => {
  Timeslot.find()
  .populate("table")
  .then((restaurant) => {
          
      return res.json(restaurant)
      
  })
  .catch((error) => next(error));
}

