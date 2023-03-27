require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption')
const app = express()

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.URI);
}

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
})

userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['password']})


const Users = mongoose.model('user', userSchema)


app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', async (req, res)=>
{
    res.render('home')
})

app.route('/login').get(async(req, res) =>
{
    res.render('login')
})
.post(async (req, res) => {
    let find_user = await Users.find({email: req.body.username})
    if(find_user.length === 0 || find_user[0].password != req.body.password){
        res.redirect('/login')
    }
    else{
        res.render('secrets')
    }
})

app.route('/register').get(async(req, res) =>{
    res.render('register')
})
.post(async(req, res) =>{
    let user_find = await Users.find({email: req.body.username})
    if (user_find.length === 0)
    {
    const newUser = new Users({email: req.body.username, password: req.body.password})
    await newUser.save()
    res.render('secrets')
    }else{
        res.redirect('/register')
    }
})

app.get('/logout', async (req, res) =>
{
    res.redirect('/')
})

app.listen(3000, () =>
{
    console.log('Server has started on port 3000')
})