const createError = require("http-errors");
const {Timeslot} = require("../models");
const hours2numbers = require("../utils/hours2numbers");
const number2hours = require("../utils/number2hours");
const verifyHours = require("../utils/verifyHours");


module.exports.detail = (req, res, next) => {
  Timeslot.findById(req.params.id)
  .then((timeslot) => {
    if(timeslot !== undefined){
      res.json({timeslot: timeslot,hours: number2hours(timeslot.hours)})
    } 
  })
  .catch((error) => next(error));
}


module.exports.create = ( req, res, next) => {


  // [["13:00","19:00"],["20:00","21:00"]], asi deben venir los bloques horarios
  //  array de dias en numero del 1 al 30
  // array de meses del 1 al 12
  const timeslot = req.body;
  delete timeslot.owner;
  delete timeslot.restaurant;

  timeslot.owner = req.user.id;
  timeslot.restaurant = req.restaurant.id;

  if(!verifyHours(timeslot.hours))
    next(createError(401))

  timeslot.hours = hours2numbers(timeslot.hours)

  Timeslot.create(timeslot)
      .then((newTimeslot) => {
        res.json( newTimeslot )
      })
      .catch(next);   

};

module.exports.update = (req, res, next) => {
  const data = req.body;
  delete data.owner;
  delete data.restaurant;

  if(!verifyHours(req.timeslot.hours))
    next(createError(400))

  req.timeslot.hours = hours2numbers(timeslot.hours)
  
  const table = Object.assign(req.timeslot, data); 

  table
      .save()
      .then((table) => res.json(table))
      .catch(next);
};

