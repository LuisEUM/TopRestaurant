const createError = require('http-errors');
const { Restaurant, Views } = require('../models');

module.exports.view = (req, res, next) => {

    const { id } = req.params;

    const detail = {
        owner: req.user.id,
        restaurant: id,
    };

    if (detail.restaurant === undefined)
        next(createError(401))

    Restaurant.findById(id)
        .populate("owner")
        .populate({
            path: "review",
            populate: {
            path: "owner",
            },
        })
        .populate("follow")
        .populate("menus")
        .populate("views")
        .populate({
            path: "schedules",
            populate: {
                path: "hours",
            },
        })
        .then((restaurant) => {
        console.log(restaurant)
        if (restaurant) {

            Views.create(detail);
            Views.count(detail)
            req.restaurant = restaurant
                    
            next();
            
        } else {
            next(createError(401))
        }
        })
        .catch(next);

}; 