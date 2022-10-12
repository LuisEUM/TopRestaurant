const createError = require("http-errors");
const Follow = require("../models/follow.model");

module.exports.userFollowList = (req, res, next) => {
    const user = req.user.id;
  
    Follow.find({ user })
        .populate("restaurant")
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



