const createError = require("http-errors");
const {Booking} = require("../models");
const moment = require('moment-timezone');
//moment.tz.names() this return an object with all the list of zone name

module.exports.
create = (req, res, next) => {
  if(req.table === undefined){
    next(
      createError(400, {
        message: "no table available for that time",
      })
    );
  }else{
    const data = req.body
 
    delete data.owner
    delete data.table
    delete data.status
  
    data.hours = req.hours
    data.owner = req.user.id
    data.table = req.table.id

    Booking.create(data)
      .then((booking) => {
  
        req.table.bookings.push(booking.id)
        req.table.save();
  
        res.status(201).json(booking)
  
      })
      .catch((error) =>  res.status(400).json("error"));
  }
}

module.exports.update = (req, res, next) => {
  if(req.table === undefined){
    next(
      createError(400, {
        message: "no table available for that time",
      })
    );
  }else{
    const data = req.body
 
    delete data.owner
    delete data.table
    delete data.status
  
    data.hours = req.hours
    data.owner = req.user.id
    data.table = req.table.id
    

    const booking = Object.assign(req.booking, data); 
    booking
      .save()
      .then((booking) => res.json(booking))
      .catch((error) =>  res.status(400).json("error"));
  }
}

module.exports.updateNote = (req, res, next) => {
    const data = Object.fromEntries(Object.entries(req.body).filter(([_, v]) => v != null));
 
    delete data.owner
    delete data.table
    delete data.status
    delete data.startDate
    delete data.hours
    delete data.person
    

    const booking = Object.assign(req.booking, data); 
    booking
      .save()
      .then((booking) => res.json(booking))
      .catch((error) =>  res.status(400).json("error"));
}

module.exports.getHours = (req, res, next) => {
  res.status(200).json( req.AvailableHours )
}

module.exports.getbookings = (req, res, next) => {

    Booking.find({ owner: req.user.id })
    .populate({
      path: "table",
      populate: {
          path: "zone",
              populate: {
                  path: "restaurant",
                  },
      },
  })
      .then((bookings) => res.json(bookings))
      .catch((error) => next(error));

}

module.exports.getBookingsDetail = (req, res, next) => {

  if(req.params.id === undefined){
    next(
      createError(400, {
        message: "no table available for that time",
      })
    );
  }
  else{
    Booking.findById(req.params.id)
      .then((bookings) => res.json(bookings))
      .catch((error) => next(error));
  }

}




  
  
