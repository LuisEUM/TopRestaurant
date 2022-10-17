const createError = require("http-errors");
const { Restaurant } = require("../models");
const Follow = require("../models/follow.model");

module.exports.userFollowList = (req, res, next) => {
    const owner = req.user.id;
  
    Follow.find({ owner })
        .populate({
            path: "restaurant",
            populate:{
                path: "review",
                path: "follow",
                path: "review",
            }})
        .then((follow) => {
            return res.json(follow)
            
        })
        .catch((error) => next(error));
}

module.exports.userFollowBool = (req, res, next) => {

    if (req.params.restaurantId === undefined)
        next(
            createError(400, {
                message: "User validation failed",
                errors: { restaurant: { message: "invalid restaurant id" } },
            })
        );

const detail = {
    owner: req.user.id,
    restaurant: req.params.restaurantId,
};

    Follow.findOne(detail)
        .then((follow) => {

            let followB = false

            if (follow) 
                followB = true

            res.json({ followB })

        })
        .catch((error) => next(error));
}

module.exports.follow = (req, res, next) => {

    const errorProduct = (next) => {
        next(
            createError(400, {
                message: "User validation failed",
                errors: { product: { message: "invalid restaurant id" } },
            })
        )
    }

    const detail = {
        owner: req.user.id,
        restaurant: req.params.restaurantId,
    };

    if (detail.restaurant === undefined)
        errorProduct(next)

    Restaurant.countDocuments({_id: req.params.restaurantId}, function (err, count){
        console.log(!(count>0)) 
        if(!(count>0)){
            errorProduct(next)
        }
    }); 

    Follow.findOne(detail)
        .then((follow) => {
        if (follow) {
            return Follow.deleteOne(detail);
        } else {
            return Follow.create(detail);
        }
        })
        .then(() => Follow.count(detail))
        .then((follow) => res.json({ follow }))
        .catch(next);
};



