const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const status = require('../data/status.booking.json')
const duration = require('../data/duration.booking.json')


const schema = new Schema ({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    table: {
        type: Schema.Types.ObjectId,
        ref: 'Table',
        required: true
    },
    status: {
        type: [{
            type: String,
            enum: status,
            required: true,
        }]
    },
    duration: {
        type: String,
        enum: duration,
        required: "Duration is required",
        required: true,
    },
    timestart: {
        type: Date,
        required: true,
    },
    persons: { 
        type: Number,
        required: true
    },        
    phoneNumber: {
        type: Number
    },
    note:{
        type: String,
        maxLength: [300, "Description needs at max 300 chars"],
    },
    newsletter: {
        type: Boolean,
        default: false
    },},
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
    })



const Booking = mongoose.model("Booking", schema);

module.exports = Booking;