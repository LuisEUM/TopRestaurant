const createError = require("http-errors");
const User = require("../models/user.model");
const mongoose = require("mongoose");
const EMAIL_PATTERN = require('../utils/patterns');

module.exports.profile = (req, res, next) => {
  res.json(req.user);
};

module.exports.register = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        next(
          createError(400, {
            message: "User validation failed",
            errors: { email: { message: "User already registered" } },
          })
        );
      } else {
        return User.create(req.body).then((user) => res.status(201).json(user));
      }
    })
    .catch(next);
};

module.exports.update = (req, res, next) => {
  
    const user = Object.assign(req.user, req.body);
    console.log(user)
    user
      .save()
      .then((user) => res.status(200).json(user))
      .catch(
        e => 
        next(
          createError(400, {
            message: "User creation failed",
            errors: `${Object.keys(e.keyValue)}: ${Object.values(e.keyValue)} is allready in use`,
          })
        )
      );

};

module.exports.authenticate = (req, res, next) => {
  function invalidAuthError() {
    next(
      createError(400, {
        message: "User validation failed",
        errors: { email: { message: "Invalid email or password" } },
      })
    );
  }

  const { id , password } = req.body;

  //this func gets the type and the value of the id
  const idType = (id) => {
    if(EMAIL_PATTERN.test(id)) {
       const email = id 
       return {email}
      } else { 
        const username = id 
        return {username}
      };
  }

  
  User.findOne(idType(id))
    .then((user) => {
      if (!user) {
        invalidAuthError();
      } else {
        return user.checkPassword(password).then((match) => {
          if (match) {
            req.session.userId = user.id;
            res.status(200).json(user);
          } else {
            invalidAuthError();
          }
        });
      }
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  req.session = null;
  res.status(204).send();
};