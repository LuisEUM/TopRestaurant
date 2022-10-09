const createError = require("http-errors");
const {Booking} = require("../models");
const mongoose = require("mongoose");
const moment = require('moment-timezone');
//moment.tz.names() this return an object with all the list of zone name


module.exports.list = (req, res, next) => {
  Booking.find()
  .populate("client")
  .populate("table")
  .then((booking) => {
      return res.json(booking)
  })
  .catch((error) => next(error));
}

module.exports.create = (req, res, next) => {
  const booking = req.body;
  delete booking.owner;
  booking.owner = req.user.id;
  delete booking.table;
  // necesito selecionar la table vacia
  delete booking.status;
  delete booking.duration;

  const bookingMadridNow = moment.tz(Date.now(), "Europe/Madrid"); // Esto es provisional es solo crear
  delete booking.timestart; // Esto es provisional es solo crear
  booking.timestart = bookingMadridNow // Esto es provisional es solo crear

  Booking.create(booking)
      .then((booking) => res.status(201).json(booking))
      .catch(next);
  }


  
  
