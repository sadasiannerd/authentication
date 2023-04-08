const express = require('express')
const ejs = require('ejs')
const router = express.Router()
const Users = require('../models/Users')
const passport = require('passport')


router.get('/login', async (req, res) =>{
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/secrets',
    failureRedirect: '/login'
}))

router.get('/register', async(req, res) =>{
    res.render('register')
})

router.post('/register', async(req, res) =>{

    await Users.register(new Users({username: req.body.username}), req.body.password, function(err, user) {
        if(err) 
        {
            console.log(err)
            return res.redirect('/register')   
        } 
        passport.authenticate('local', {
            successRedirect: '/secrets',
            failureRedirect: '/register'
        })(req,res)
})
})

router.get('/logout', async(req, res, next) =>{
    await req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
    });
});

router.get('/login/federated/google', passport.authenticate('google'))

router.get('/oauth2/redirect/google', passport.authenticate('google', {
    successRedirect: '/secrets',
    failureRedirect: '/login'
  }));

module.exports = router

