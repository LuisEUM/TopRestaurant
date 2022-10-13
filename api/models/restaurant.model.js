const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const categories = require('../data/categories.restaurants.json')
const services = require('../data/services.restaurants.json')
const prefixNumber = require('../data/prefix.numbers.json')

const isURL = require('../utils/validations.js');

const restaurantSchema = new Schema ({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    menus: [{
        type: Schema.Types.ObjectId,
        ref: 'Menu',
    }],
    zones: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Zone',
        }]
    },
    name: {
        type: String,
        required: "Title is required",
        maxLength: [120, "Name needs at max 60 chars"],
        required: true,
    },
    categories: {
        type: [{
            type: String,
            enum: categories,
            required: true,
        }]
    },
    backgroundHero: {
        type: String,
        default: "https://loremflickr.com/320/240/food",
        validate: {
            validator: isURL,
            message: `Invalid URL`,
            },
        },
    logo: {
        type: String,
        default: "https://loremflickr.com/320/240/food",
        validate: {
            validator: isURL,
            message: `Invalid URL`,
            },
    },
    prefix: {
            type: String,
            enum: prefixNumber.map((prefix)=> prefix.dial_code),
    },
    phoneNumber: {
        type: Number
    },
    delivery: { 
        type: Boolean,
        default: false
    },        
    address:{
            type: String,
            maxLength: [500, "Address needs at max 500 chars"],
    },
    description:{
        type: String,
        maxLength: [300, "Description needs at max 300 chars"],
        required: true
    },
    services: {
        type: [{
            type: String,
            enum: services,
            required: true,
        }]
    },
    schedules : {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Schedule',
        }]
    },
    settings : {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'RestaurantSetting',
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
    })

restaurantSchema.virtual("follow", {
    ref: "Follow",
    localField: "_id",
    foreignField: "restaurant",
    count: true,
});

restaurantSchema.virtual("review", {
    ref: "Review",
    localField: "_id",
    foreignField: "restaurant",
});
    
restaurantSchema.pre("validate", function (next) {
    this.logo = this.logo || undefined;
    this.description = this.description || undefined;
    this.backgroundHero = this.backgroundHero || undefined;

    next();
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;