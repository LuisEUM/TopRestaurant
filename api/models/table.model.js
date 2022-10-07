const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    size: {
      type: Number,
      required: true
    },
    zones: {
      type: [{
          type: String,
          enum: services,
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