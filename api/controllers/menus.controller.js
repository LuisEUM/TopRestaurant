const mongoose = require("mongoose");
const { Menu, Restaurant } = require("../models");

module.exports.list = (req, res, next) => {
  Menu.find(req.query)
    .then(menus => {
        return res.json(menus)
    })
    .catch(next)

}

module.exports.detail = (req, res, next) => {
  Menu.findById(req.params.id)
  .populate('product')
  .then((menu) => res.json(menu))
  .catch((error) => next(error));
};

module.exports.create = (req, res, next) => {
  
  const menu = {
    ...req.body,
    menuOwner: req.user.id
  };

  Menu.create(menu)
    .then((menu) => {
      Restaurant.findById(req.params.restaurantId)
      .then((restaurant) => {
        restaurant.menu.push(menu.id)
        restaurant.save();
        (menu) => res.status(201).json(menu)
      })
      .catch((error) =>  res.status(400).json(error));
    })
    .catch((error) =>  res.status(400).json(error));
};

module.exports.update = (req, res, next) => {
    const data = req.body;
    delete data.views;
    delete data.restaurant;

    const menu = Object.assign(req.menu, data);

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