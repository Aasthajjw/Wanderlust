const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const {isLoggedIn, validateListing} = require('../middleware.js');
const ListingController = require('../controller/listing.js');
const multer  = require('multer');
const {storage} = require('../cloudConfig.js')
const upload = multer({storage});

router.route('/')
    .get(wrapAsync(ListingController.index)) //index route
    .post(isLoggedIn, validateListing, upload.single('listing[image]'), wrapAsync(ListingController.create)); //create route

//new route
router.get('/new', isLoggedIn, wrapAsync(ListingController.new));

router.route('/:id')
    .get(wrapAsync(ListingController.show)) //show route
    .put( isLoggedIn, validateListing, upload.single('listing[image]'), wrapAsync(ListingController.update)) //update route
    .delete(isLoggedIn, wrapAsync(ListingController.delete)); //delete route

//edit route
router.get('/:id/edit', isLoggedIn, wrapAsync(ListingController.edit));

module.exports = router;