const createError = require('http-errors');
const { Restaurant, Views } = require('../models');

module.exports.getHours = (req, res, next) => {

    const { id } = req.params;

    if (id === undefined)
        next(createError(401))

    Restaurant.findById(id)
        .populate({
            path: "zones",
            populate: {
                path: "tables",
                    populate: {
                        path: "bookings",
                        },
            },
        })
        .then((restaurant) => {
        console.log(restaurant)
         next()
        })
        .catch(next);

};