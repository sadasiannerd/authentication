
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')


// define user schema
const userSchema = new mongoose.Schema({
    password: String,  
    id: String,
    name: String,
    secret: String,
})
// hash password using passport-local-mongoose
userSchema.plugin(passportLocalMongoose)

const Users = mongoose.model('user', userSchema)
module.exports = Users