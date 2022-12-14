const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const isURL = require('../utils/validations.js');

const menuSchema = new Schema ({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    restaurant: {
        ref: "Restaurant",
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    products: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }],
    name: {
        type: String,
        required: "Name is required",
        maxLength: [60, "Name max 60 chars"],
        trim: true
    },
    description:{
        type: String,
        maxLength: [150, "Description max 150 chars"],
        trim: true
    },
    coverImage: {
        type: String,
        default: "https://loremflickr.com/320/240/food",
        validate: {
            validator: isURL,
            message: `Invalid URL`,
            },
        }
},
{
    timestamps: true,
    toJSON: {
    virtuals: true,
        transform: (doc, ret) => {
            delete ret.__v;
            ret.id = ret._id;
            delete ret._id;
            return ret;
        },
    },
}
)

menuSchema.pre("validate", function (next) {
    this.coverImage = this.coverImage || undefined;
    this.description = this.description || undefined;
    next();
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
