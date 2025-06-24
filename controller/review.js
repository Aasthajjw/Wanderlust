const Review = require('../models/review.js');
const Listing = require('../models/listing.js');

module.exports.reviewPost = async (req, res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = await Review(req.body.review);
    newReview.author = req.user._id;
    listing.review.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash('success', 'Thanks for your Review!');
    res.redirect(`/listings/${listing._id}`);
};

module.exports.reviewDelete = async (req, res)=>{
    let{id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {review: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review Deleted!');
    res.redirect(`/listings/${id}`);
};