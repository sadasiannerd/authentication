// add environment as soon as we start coding the app so that it won't be affected by version control
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const ejs = require('ejs')

const passport = require('passport')
require('./models/passportConfiguration')(passport)

// connect to dbs
const db = require('./db')
db.connect()

const Users = require('./models/Users')

//app configuration
const app = express()

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

//set up passport configuration
passport.use(Users.createStrategy())

// configure the app using passport (express-session -> initialize -> passport session)
const crypto = require('crypto')
const sessionSecret = crypto.randomBytes(64).toString('hex');

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 } // session expires after 1 hour (in milliseconds)
}))
app.use(passport.authenticate('session'));
app.use(passport.initialize())
app.use(passport.session())

// routes configuration
authRoute = require('./routes/authRoute')
indexRoute = require('./routes/indexRoute')
app.use('/', authRoute)
app.use('/', indexRoute)


app.listen(3000, () =>
{
    console.log('Server has started on port 3000')
})