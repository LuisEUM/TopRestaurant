const Review = require("../models/review.model");

module.exports.userReviewList = (req, res, next) => {
  const user = req.user.id;

  Review.find({ user })
  .then((review) => {
          
      return res.json(review)
      
  })
  .catch((error) => next(error));
}

module.exports.restaurantReviewList = (req, res, next) => {

  const restaurant = req.params.id;

  Review.find({ restaurant })
  .then((review) => {
          
      return res.json(review)
      
  })
  .catch((error) => next(error));
}

module.exports.create = (req, res, next) => {
    Review.create({
    rate: req.body.rate,
    text: req.body.text,
    restaurant: req.params.restaurantId,
    owner: req.user.id,
  })
    .then((review) => res.status(201).json(review))
    .catch(next);
};

module.exports.update = (req, res, next) => {
  req.review.rate = req.body.rate;
  req.review.text = req.body.text;

  req.review
    .save()
    .then((review) => res.json(review))
    .catch(next);
};

module.exports.delete = (req, res, next) => {
    Review.deleteOne({ _id: req.review.id })
        .then(() => res.status(204).send("review deleted"))
        .catch(next);
};