const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const time = require('../data/time.slot.json')
const weekDays = require('../data/weekDays.slot.json') 

const schema = new Schema(
  {
  openHours: {
    type: [{
        type: String,
        enum: time,
    }]
  },
  closeHours: {
    type: [{
        type: String,
        enum: time,
    }]
  },
    dayOfWeek: {
      type: [{
          type: String,
          enum: weekDays,
      }]
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);

const Timeslot = mongoose.model("Timeslot", schema);
module.exports = Timeslot;