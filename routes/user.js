const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');
const UserController = require('../controller/user.js');

router.route('/signup')
.get(UserController.signup)
.post(wrapAsync(UserController.postSignup));

router.route('/login')
.get(UserController.login)
.post(saveRedirectUrl, passport.authenticate('local', {failureRedirect: '/login', failureFlash: true}), UserController.postLogin);

router.get('/logout', UserController.logout);

module.exports = router;