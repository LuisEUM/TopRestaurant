const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const allergens = require('../data/product.allergens')
const isURL = require('../utils/validations.js');


const productSchema = new Schema ({
    productOwner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    menu: {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        required: true,
    },
    name: {
        type: String,
        required: "Name is required",
        maxLength: [60, "Title needs at least 60 chars"],
        trim: true
    },
    image: {
        type: String,
        default: "https://loremflickr.com/320/240/food",
        validate: {
            validator: isURL,
            message: `Invalid URL`,
            },
        },
    price: {
        type: Number,
        trim: true
    },
    description:{
        type: String,
        trim: true
    },
    allergens:{
        type: [{
            type: String,
            enum:  allergens.map((allergen) => allergen.value),
            trim: true
        }]
    },
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

productSchema.virtual("Like", {
    ref: "Like",
    localField: "_id",
    foreignField: "product",
    count: true,
});

productSchema.pre("validate", function (next) {
    this.image = this.image || undefined;
    this.description = this.description || undefined;

    next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;