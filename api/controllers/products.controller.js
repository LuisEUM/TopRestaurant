const mongoose = require("mongoose");
const { Category, Product, Menu } = require("../models");
const allergens = require('../data/product.allergens')


module.exports.list = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("products/list", { products });
    })
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  Product.findById(req.params.id)
  .then((product) => res.render("products/detail", { product }))
  .catch((error) => next(error));
};

module.exports.new = (req, res, next) => {
    const product = {
      category: req.params.id
  };
    res.render(('products/new'), {product, categoriesAllergens}) 
};


module.exports.create = (req, res, next) => {

  const producto = {
    ...req.body,
    category:req.params.id
};

Product.create(producto)
.then((product) =>{
    Category.findById(req.params.id)
    .then((category) => {
        category.products.push(product.id)
        category.save();
    })
    res.redirect(`/categories/${producto.category}`)
})
.catch((error) => {
    if (error instanceof mongoose.Error.ValidationError) {
        console.error(error);
        res.render(`products/new`, { errors: error.errors, product, categoriesAllergens });
    } else {
        next(error);
    }
});
};

module.exports.delete = (req, res, next) => {
    Product.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("back"))
    .catch((error) => next(error));
};


module.exports.edit = (req, res, next) => {
  Product.findById(req.params.id)
      .then((product) => { 
              res.render("products/edit", { product, categoriesAllergens })
      })
      .catch((error) => next(error));
};


module.exports.update = (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, req.body)
  .then((product) => { 
    const category = product.category.toString()
      res.redirect(`/categories/${category}`);
  })
  .catch((error) => next(error));
}