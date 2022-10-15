const createError = require("http-errors");
const {Like, Product} = require("../models");

const errorProduct = (next) => {
    next(
        createError(400, {
            message: "User validation failed",
            errors: { product: { message: "invalid product id" } },
        })
    )
}

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
        errorProduct(next)


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

    const errorProduct = (next) => {
        next(
            createError(400, {
                message: "User validation failed",
                errors: { product: { message: "invalid product id" } },
            })
        )
    }

    const detail = {
        owner: req.user.id,
        product: req.params.restaurantId,
    };

    if (detail.product === undefined)
        errorProduct(next)

    Product.countDocuments({_id: detail.product}, function (err, count){
        console.log(!(count>0)) 
        if(!(count>0)){
            errorProduct(next)
        }
    }); 

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



