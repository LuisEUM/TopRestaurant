const express = require("express");
const router = express.Router();
const secure = require("../middlewares/secure.mid.js");
const {restaurants, review} = require('../controllers');

router.post("/", secure.isAuthenticated, restaurants.create);
router.get("/", secure.isAuthenticated, restaurants.list);
router.get("/:id", secure.isAuthenticated, restaurants.detail);
router.patch("/:id", secure.isAuthenticated, secure.isRestaurantOwnedByUser, restaurants.update);
router.delete(
    "/:id",
    secure.isAuthenticated,
    secure.isRestaurantOwnedByUser,
    restaurants.delete
  );

//follows
router.post("/:id/follow", secure.isAuthenticated, restaurants.follow);

//coments
router.post("/:id/review", secure.isAuthenticated, review.create);

router.patch(
"/:id/review/:commentId",
secure.isAuthenticated,
secure.isreviewOwnedByUser,
review.update
);

router.delete(
"/:id/review/:commentId",
secure.isAuthenticated,
secure.isreviewOwnedByUser,
review.delete
);

module.exports = router;
