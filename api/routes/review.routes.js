const express = require("express");
const router = express.Router();
const secure = require("../middlewares/secure.mid.js");
const {review} = require('../controllers');


router.get(
    "/",
    secure.isAuthenticated,
    secure.isReviewOwnedByUser,
    review.userReviewList
);

router.get(
    "/:restaurantId",
    secure.isAuthenticated,
    secure.isReviewOwnedByUser,
    review.userReviewList
);

router.post("/:restaurantId", secure.isAuthenticated, review.create);

router.patch(
    "/:reviewId",
    secure.isAuthenticated,
    secure.isReviewOwnedByUser,
    review.update
    );
    
router.delete(
    "/:reviewId",
    secure.isAuthenticated,
    secure.isReviewOwnedByUser,
    review.delete
);



module.exports = router;