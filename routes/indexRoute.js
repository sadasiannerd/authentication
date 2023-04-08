const express = require('express')
const ejs = require('ejs')
const router = express.Router()
const bodyParser = require('body-parser')
const Users = require('../models/Users')
const passport = require('passport')


router.get('/', async (req, res) =>{
    res.render('home')
})

router.get('/secrets', async (req, res) =>
{     
    if (req.isAuthenticated()){
        res.render('secrets', {user: req.user.user})}
    else res.redirect('/')
})

router.get('/submit', async (req, res) => {
    if(req.isAuthenticated()) res.render('submit', {user: req.user.user})
    else res.redirect('/')
})

router.post('/submit', async (req, res) => {
    await Users.updateOne({id: req.user.user.id}, {$set: {secret: req.body.secret}})
    req.user.user.secret = req.body.secret
    res.redirect('/secrets')
})


module.exports = router
