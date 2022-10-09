const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    maxCapacity: {
      type: Number,
      required: true
    },
  timeslots: [{
    type: Schema.Types.ObjectId,
    ref: 'Timeslot',
  }],
  tables: [{
    type: Schema.Types.ObjectId,
    ref: 'Table',
  }],
  bookings: [{
    type: Schema.Types.ObjectId,
    ref: 'Booking',
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

const Zone = mongoose.model("Zone", schema);
module.exports = Zone;