const {Restaurant} = require("../models");
const setting = require("./restaurantSettings.controller");


module.exports.list = (req, res, next) => {
    Restaurant.find()
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
    .then((restaurant) => {
        
        return res.json(restaurant)
        
    })
    .catch((error) => next(error));
}


module.exports.create = (req, res, next) => {
const restaurant = req.body;
delete restaurant.owner;
delete restaurant.menus;
delete restaurant.views;

restaurant.owner = req.user.id;
console.log(restaurant)
Restaurant.create(restaurant)
    .then((restaurant) => {
        setting.create(req, res, next, restaurant)
    })
    .catch(next);   
    
}


module.exports.detail = (req, res, next) => {
    
    console.log(req.restaurant)
    res.json(req.restaurant);

};

module.exports.update = (req, res, next) => {
    const data = req.body;
    delete data.views;
    delete data.owner;
    delete data.menus;

    const restaurant = Object.assign(req.restaurant, data);

    restaurant
        .save()
        .then((restaurant) => res.json(restaurant))
        .catch(next);
};

module.exports.delete = (req, res, next) => {
    Restaurant.deleteOne({ _id: req.restaurant.id })
      .then(() => res.status(204).send())
      .catch(next);
  };