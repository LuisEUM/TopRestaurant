const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const time = require('../data/time.slot.json')

const schema = new Schema(
  {
  openHours: {
    type: String,
    enum: time,
  },
  closeHours: {
    type: String,
    enum: time,

  },
  ScheduleOwn: {
    type: Schema.Types.ObjectId,
    ref: 'Schedule' ,
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

const ScheduleHours = mongoose.model("ScheduleHours", schema);
module.exports = ScheduleHours;