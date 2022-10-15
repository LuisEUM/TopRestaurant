const { Menu, Restaurant } = require("../models");

module.exports.list = (req, res, next) => {
  Menu.find()
    .then(menus => {
        return res.json(menus)
    })
    .catch(next)

}

module.exports.detail = (req, res, next) => {
  Menu.findById(req.params.id)
  .populate('products')
  .then((menu) => res.json(menu))
  .catch((error) => next(error));
};

module.exports.create = (req, res, next) => {
  
  const menu = {
    ...req.body,
    restaurant: req.restaurant.id,
    owner: req.user.id
  };

  Menu.create(menu)
    .then((menu) => {

      req.restaurant.menus.push(menu.id)
      req.restaurant.save();
      res.status(201).json(menu)

    })
    .catch((error) =>  res.status(400).json(error));
};

module.exports.update = (req, res, next) => {
    const data = req.body;
    delete data.owner;
    delete data.restaurant;
    delete data.products;

    const menu = Object.assign(req.menu, data);

    menu
        .save()
        .then((menu) => res.json(menu))
        .catch(next);
};

module.exports.delete = (req, res, next) => {
    Restaurant.findById(req.menu.restaurant)
      .then((restaurant) => {
        const resMenus =restaurant.menus
        resMenus.splice(resMenus.indexOf(req.menu.id), 1);
        restaurant.save();
      })
      .then(() => {
        Menu.deleteOne({ _id: req.menu.id })
        .then(() => res.status(204).send())
        .catch(next);
      })
  };