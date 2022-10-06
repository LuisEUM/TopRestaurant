const createError = require("http-errors");
const User = require("../models/user.model");
const mongoose = require("mongoose");
const EMAIL_PATTERN = require('../utils/patterns');

module.exports.favorites = (req, res, next) => {
    const user = req.user.id;

    Follow.find({ user })
        .then((follow) => {
            return res.json(follow)
        })
        .then((follow) => res.json({ follow }))
        .catch((error) => next(error));
};

