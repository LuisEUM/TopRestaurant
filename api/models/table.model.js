const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const size = require('../data/size.table.json')

const schema = new Schema(
  {
    size: {
      type: String,
      enum: size,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    zones: {
      type: [{
          type: String,
          required: true,
      }]
  },
  timeslots: [{
    type: Schema.Types.ObjectId,
    ref: 'Timeslot',
  }],
  bookings: [{
    type: Schema.Types.ObjectId,
    ref: 'Booking',
  }],
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
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

const Table = mongoose.model("Table", schema);
module.exports = Table;