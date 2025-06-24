const User = require('../models/user.js');

module.exports.signup = (req, res)=>{
    res.render('users/signup.ejs');
};

module.exports.postSignup = async(req, res, next)=>{
    try{
        let{username, email, password} = req.body;
        const newUser = new User({username, email});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err)=>{
            if(err){
                return next(err);
            }
            req.flash('success', 'Signedup Successfully! Welcome to WanderLust');
            res.redirect('/listings');
        }) 
    }catch(err){
        req.flash('error', err.message);
        res.redirect('/signup');
    }   
};

module.exports.login = (req, res)=>{
    res.render('users/login.ejs');
};

module.exports.postLogin = (req, res)=>{
    req.flash('success', 'LoggedIn Successfully! Welcome to WanderLust'); 
    let redirectURL = res.locals.redirectURL || '/listings';
    res.redirect(redirectURL);      
};

module.exports.logout = (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }else{
            req.flash('success', 'LoggedOut Successfully! See you soon!'); 
            res.redirect('/listings'); 
        }
    })     
};