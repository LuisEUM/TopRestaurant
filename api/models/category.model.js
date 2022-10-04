const mongoose = require('mongoose')
const Schema = mongoose.Schema;
import { isURL } from '../utils/validations';

const menuSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: "Name is required",
        maxLength: [60, "Name needs max 60 chars"],
        trim: true
    },
    description:{
        type: String,
        maxLength: [150, "Description needs max 150 chars"],
        trim: true
    },
    menu: {
        type: Schema.Types.ObjectId,
        ref: 'Menu'
    },
    coverImage: {
        type: String,
        default: "https://loremflickr.com/320/240/food",
        validate: {
            validator: isURL,
            message: `Invalid URL`,
            },
        },
    products: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }],
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

const Category = mongoose.model("Category", menuSchema);

module.exports = Category;
