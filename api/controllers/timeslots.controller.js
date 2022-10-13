const createError = require("http-errors");
const {Timeslot} = require("../models");


module.exports.list = (req, res, next) => {
  Timeslot.find()
  .populate("table")
  .then((restaurant) => {
          
      return res.json(restaurant)
      
  })
  .catch((error) => next(error));
}

