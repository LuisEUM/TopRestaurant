const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const status = require('../data/status.booking.json')
const prefixNumbers = require('../data/prefix.numbers.json')

const schema = new Schema ({
    owner: {
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
        type: {
            type: String,
            enum: status,
            required: true,
            default: "Pending"
        }
    },
    startDate: {
        type: Number,
        required: true,
    },
    hours: {
        type: [Number],
        required: true,
        min: 0,
        max: 47
      },
    persons: { 
        type: Number,
        required: true
    },
    prefixNumber: {
        type: String,
        enum: prefixNumbers.map((prefix) => prefix.dial_code),
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