const createError = require("http-errors");
const {Like} = require("../models");

module.exports.userLikeList = (req, res, next) => {
    const user = req.user.id;
  
    Like.find({ user })
    .populate("product")
    .then((like) => {
            
        return res.json(like)
        
    })
    .catch((error) => next(error));
  }

module.exports.userLikeBool = (req, res, next) => {

    if (req.params.productId === undefined)
    next(
        createError(400, {
        message: "User validation failed",
        errors: { restaurant: { message: "invalid restaurant id" } },
        })
    );

    const detail = {
        owner: req.user.id,
        product: req.params.productId,
    };

    Like.findOne(detail)
        .then((like) => {

            let liked = false

            if (like) 
                liked = true

            res.json({ liked })

        })
        .catch((error) => next(error));
}

module.exports.like = (req, res, next) => {

    if (req.params.productId === undefined)
        next(
            createError(400, {
            message: "User validation failed",
            errors: { restaurant: { message: "invalid restaurant id" } },
            })
        );

    const detail = {
        owner: req.user.id,
        product: req.params.productId,
    };

    Like.findOne(detail)
        .then((like) => {
            if (like) {
                return Like.deleteOne(detail);
            } else {
                return Like.create(detail);
            }
        })
        .then(() => Like.count(detail))
        .then((like) => res.json({ like }))
        .catch(next);
};



