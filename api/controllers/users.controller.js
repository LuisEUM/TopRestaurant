const createError = require("http-errors");
const {Follow} = require("../models");

module.exports.favorites = (req, res, next) => {
    const user = req.user.id;

    Follow.find({ user })
        .then((follow) => {
            return res.json(follow)
        })
        .then((follow) => res.json({ follow }))
        .catch((error) => next(error));
};

