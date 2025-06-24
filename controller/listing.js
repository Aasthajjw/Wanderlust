const Listing = require('../models/listing.js');
const mapToken = process.env.MAP_TOKEN;

module.exports.index = async (req, res)=>{
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', {allListings});
};

module.exports.new = async (req, res)=>{
    res.render('listings/new.ejs');
};

module.exports.show = async (req, res)=>{
    let{id} = req.params;
    const listing = await Listing.findById(id).populate({path: "review", populate:{path: "author"}}).populate('owner');
    if(!listing){
        req.flash('error', 'Listing does not exist!');
        res.redirect('/listings');
    }else{
        res.render('listings/show.ejs', {listing});
    }
};

module.exports.create = async (req, res)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {filename, url};
    const mapUrl = `https://api.maptiler.com/geocoding/${newListing.location}.json?key=${mapToken}`;
    const response = await fetch(mapUrl);
    const data = await response.json();
    newListing.geometry = data.features[0].geometry;
    await newListing.save();
    req.flash('success', 'New Listing Created!');
    res.redirect('/listings');
};

module.exports.edit = async (req, res)=>{
    let{id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash('error', 'Listing does not exist!');
        res.redirect('/listings');
    }else{
        let originalImg = listing.image.url;
        let convImg = originalImg.replace('/upload', '/upload/h_300,w_250')
        res.render('listings/edit.ejs', {listing, convImg});
    }
};

module.exports.update = async (req, res)=>{
    let{id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {filename, url};
        await listing.save();
    };
    req.flash('success', 'Listing Updated!');
    res.redirect(`/listings/${id}`);
};

module.exports.delete = async (req, res)=>{
    let{id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash('success', 'Listing deleted!');
    res.redirect("/listings");
};