const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const types = require('../data/types.restaurants.json')
const services = require('../data/services.restaurants.json')
const isURL = require('../utils/validations.js');

const restaurantSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: "Title is required",
        maxLength: [120, "Name needs at max 60 chars"],
        required: true,
    },
    types: {
        type: [{
            type: String,
            enum: types,
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
    /*schedule: [{
        "schedule_begin": {
            type: Date,
            required: true,
        },
        "schedule_end":{
            type: Date,
            required: true,
        },
        "schedule_days_runs": {
            type: Number,
            min: 0,
            max: 6,
            required: true,
        },
    }],*/
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
    menus: [{
        type: Schema.Types.ObjectId,
        ref: 'Menu',
    }],
    services: {
        type: [{
            type: String,
            enum: services,
            required: true,
        }]
    },},
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
    ref: "follow",
    localField: "_id",
    foreignField: "restaurant",
    count: true,
});

restaurantSchema.virtual("review", {
    ref: "review",
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