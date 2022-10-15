const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    owner: {
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

const Views = mongoose.model("Views", schema);
module.exports = Views;