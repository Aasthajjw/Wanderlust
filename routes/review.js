const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapAsync.js');
const {isLoggedIn, validateReview} = require('../middleware.js');
const ReviewController = require("../controller/review.js");

//review route
router.post('/', isLoggedIn, validateReview, wrapAsync(ReviewController.reviewPost));

//delete review route
router.post('/:reviewId', wrapAsync(ReviewController.reviewDelete));

module.exports = router;