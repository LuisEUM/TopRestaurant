const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    maximumMonthBookings: {
          type: Number,
          min: 1,
          max: 12,
          default: 3
    },
  peopleMaxCapacity: {
      type: Number,
      min: 1,
      default: 120
  },
  bookingDuration: {
    type: Number,
    min: 1,
    max: 8,
    default: 3
  },
  bookingMaxPersons: {
    type: Number,
    max: 12,
    default: 4
  },
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

const RestaurantSetting = mongoose.model("RestaurantSetting", schema);
module.exports = RestaurantSetting;