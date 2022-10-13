const createError = require("http-errors");
const {Schedule, Restaurant } = require("../models");
const schedulesHours = require("./scheduleHours.controller");
const mongoose = require("mongoose");
const verifyHours = require("../utils/verifyHours");

module.exports.detail = (req, res, next) => {
  Schedule.find()
  .then(() => {
    Restaurant.findById(req.params.restaurantId)
      .then((restaurant) => {
        return res.json(restaurant.schedules) 
      })
    })
  .catch((error) => next(error));
}

module.exports.create = (req, res, next) => {

  const insertHours = (req, res, next, schedule, hours) => {

    const verify = verifyHours(hours)


    if(verify){
      schedulesHours.createMany( req, res, next, schedule, hours )
    }
    else{
      next(
          createError(400, {
          message: "invalid hours ",
          errors: { hours: { message: "invalid hours" } },
        })
      )
    }


  }

  const schedule = req.body;
  const hours = req.body.hours

  delete schedule.hours
  delete schedule.restaurant;
  delete schedule.owner;

  schedule.restaurant = req.params.restaurantId
  schedule.owner = req.user.id

   Schedule.create(schedule)
     .then((schedule) => {

       Restaurant.findById(schedule.restaurant)
       .then((restaurant) => {  
         restaurant.schedules.push(schedule._id)
         restaurant.save();
       })
       .then(() => insertHours( req, res, next, schedule, hours))
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

  const schedule = Object.assign(req.schedule, data);

  schedule
      .save()
      .then((schedule) => res.json(schedule))
      .catch(next);
};


module.exports.delete = (req, res, next) => {
  console.log(req.schedule)
  Restaurant.findById(req.schedule.restaurant)
    .then((restaurant) => {
      const restaurantSchedules = restaurant.schedules
      restaurantSchedules.splice(restaurantSchedules.indexOf(req.schedule._id), 1);
      restaurant.save();
    })
    .then(() => {
      Schedule.deleteOne({ _id: req.schedule._id })
      .then(() => res.status(204).send())
      .catch(next);
    })
    .catch(next);
};