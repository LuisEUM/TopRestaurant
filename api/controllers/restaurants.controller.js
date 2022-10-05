const mongoose = require("mongoose");
const { Restaurant, User } = require("../models");
const types = require('../data/types.restaurants.json')
const services = require('../data/services.restaurants.json')

module.exports.list = (req, res, next) => {
    Restaurant.find()
    .populate("user")
    .populate("menu")
    .then((streams) => res.json(streams))
    .catch((error) => next(error));
}


module.exports.create = (req, res, next) => {
const restaurant = req.body;
delete restaurant.user;
delete restaurant.menu;

restaurant.user = req.user.id;

Restaurant.create(restaurant)
    .then((restaurant) => res.status(201).json(restaurant))
    .catch(next);
}


module.exports.detail = (req, res, next) => {
    Restaurant.findById(req.params.id)
    .populate("user")
    .populate("menu")
    .then((restaurant) => {
        if (restaurant) {
            res.json(restaurant);
        } else {
            next(createError(404, "Restaurant not found"));
        }
    })
    .catch((error) => next(error));
};

module.exports.update = (req, res, next) => {
    const data = req.body;
    delete data.views;
    delete data.user;
    delete data.menu;

    const restaurant = Object.assign(req.restaurant, data);

    restaurant
        .save()
        .then((restaurant) => res.json(restaurant))
        .catch(next);
};


/*

Restaurant.create(restaurant)
    .then((restaurant) =>{
        User.findById(req.user.id)
        .then((user) => {
            if (user) {
                user.restaurant.push(restaurant.id)
                user.save();
            }
            else throw mongoose.Error.ValidationError
        })
        res.redirect("/restaurants")
    })
    .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(error);
            res.render("restaurants/new", { errors: error.errors, restaurant, types, services });
        } else {
            next(error);
        }
    });
};

module.exports.delete = (req, res, next) => {
    Restaurant.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("back"))
    .catch((error) => next(error));
};




module.exports.edit = (req, res, next) => {

    Restaurant.findById(req.params.id)
        .then((restaurant) => { 
            if(restaurant.user.toString() === req.user.id){
                res.render("restaurants/edit", { restaurant, types, services })
            } else {
                res.redirect("/");
            }
        })
        .catch((error) => next(error));
};


module.exports.update = (req, res, next) => {

    Restaurant.findByIdAndUpdate(req.params.id, req.body)
    .then((restaurant) => { 
        if(req.file){
            restaurant.logo = req.file.path
            restaurant.save()
            res.redirect(`/restaurants/${req.params.id}`);
        } else {
            res.redirect(`/restaurants/${req.params.id}`);
        }
    });
}
*/