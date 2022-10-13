const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const time = require('../data/time.slot.json')
const weekDays = require('../data/weekDays.slot.json') 

const schema = new Schema(
  {
  dayOfWeek: {
    type: [{
        type: String,
        enum: weekDays,
    }]
    },
    hours: [{
      type: Schema.Types.ObjectId,
      ref: 'ScheduleHours',
    }],
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
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

const Schedule = mongoose.model("Schedule", schema);
module.exports = Schedule;