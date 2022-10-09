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
    owner: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    bookings: [{
      type: Schema.Types.ObjectId,
      ref: 'Booking',
    }],
    zone: {
      type: Schema.Types.ObjectId,
      ref: 'Zone',
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