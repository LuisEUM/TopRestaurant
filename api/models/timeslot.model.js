const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    hours: {
      type: [Number],

      min: 0,
      max: 47
    },
    date: {
      type: [Number],

      min: 1,
      max: 31
    },
    month: {
      type: [Number],

      min: 1,
      max: 12
    },
    restaurant: {
      ref: "Restaurant",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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

const Timeslot = mongoose.model("Timeslot", schema);
module.exports = Timeslot;