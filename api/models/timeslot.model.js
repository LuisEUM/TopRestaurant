const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const monthsLong = require('../data/monthsLong.slot.json')
const monthsShort = require('../data/monthsShort.slot.json')
const time = require('../data/time.slot.json')

const schema = new Schema(
  {
    hour: {
      type: [{
          type: String,
          enum: time,
          required: true,
      }]
  },
    date: {
      type: Number,
      required: true,
      min: 1,
      max: 31
    },
    month: {
      type: [{
          type: String,
          enum: monthsLong || monthsShort,
          required: true,
      }],
      year: {
        type: Number,
        required: true,
        min: 2012,
      },
  },
  table: [{
    type: Schema.Types.ObjectId,
    ref: 'Table',
  }],
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