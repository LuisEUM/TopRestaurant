const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    rate: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        required: true,
      },
    text: {
      type: String,
      required: true,
    },
    user: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    restaurant: {
      ref: "Restaurant",
      type: mongoose.Schema.Types.ObjectId,
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

const Review = mongoose.model("review", schema);
module.exports = Review;