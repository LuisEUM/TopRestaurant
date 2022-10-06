const Review = require("../models/review.model");

module.exports.create = (req, res, next) => {
    Review.create({
    rate: req.body.rate,
    text: req.body.text,
    restaurant: req.params.id,
    user: req.user.id,
  })
    .then((review) => res.status(201).json(review))
    .catch(next);
};

module.exports.update = (req, res, next) => {
  req.review.text = req.body.text;

  req.review
    .save()
    .then((review) => res.json(review))
    .catch(next);
};

module.exports.delete = (req, res, next) => {
    Review.deleteOne({ _id: req.review.id })
        .then(() => res.status(204).send())
        .catch(next);
};