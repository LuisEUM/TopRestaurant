const { Product, Menu } = require("../models");

module.exports.list = (req, res, next) => {
  Product.find()
    .then(products => {
        return res.json(products)
    })
    .catch(next)

}

module.exports.detail = (req, res, next) => {
  Product.findById(req.params.id)
  .then((product) => res.json(product))
  .catch((error) => next(error));
};

module.exports.create = (req, res, next) => {
  
  const product = {
    ...req.body,
    menu: req.params.menuId,
    owner: req.user.id
  };

  console.log(product)

  Product.create(product)
    .then((product) => {
      Menu.findById(req.params.menuId)
      .then((menu) => {
        menu.products.push(product.id)
        menu.save();
        console.log(menu)
        res.status(201).json(product)
      })
      .catch((error) =>  res.status(400).json(error));
    })
    .catch((error) =>  res.status(400).json(error));
};

module.exports.update = (req, res, next) => {
    const data = req.body;
    delete data.owner;
    delete data.menu;

    const product = Object.assign(req.product, data);

    product
        .save()
        .then((product) => res.json(product))
        .catch(next);
};

module.exports.delete = (req, res, next) => {
    Menu.findById(req.product.menu)
      .then((menu) => {
        const menuProducts = menu.products
        menuProducts.splice(menuProducts.indexOf(req.product.id), 1);
        menu.save();
      })
      .then(() => {
        Product.deleteOne({ _id: req.product.id })
        .then(() => res.status(204).send())
        .catch(next);
      })
      .catch(next);
  };