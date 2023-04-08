const Users_Google = require('./Users');
const GoogleStrategy = require('passport-google-oidc').Strategy
//set up passport configuration
//OAuth Google authenticator
    module.exports = async (passport) => {
    passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/oauth2/redirect/google',
    scope:['profile', 'email']
  }, async (issuer, profile, email, cb) => {
    try{
    let existingUser = await Users_Google.findOne({ id: profile.id });
    if (existingUser) {
      return cb(null, existingUser)
    }
    const newUser = new Users_Google({
    id: profile.id,
    name: profile.displayName,
    username: profile.emails[0].value,
    });
    await newUser.save();
    return cb(null, newUser); //no error and the User information
    } catch (error) {
    return cb(error, false) //error and no user information
    }
    }
    ))
    passport.serializeUser((user, cb) => {
        cb(null, {user: user});
});
      
passport.deserializeUser((user, cb) => {
  return cb(null, user)
}); 
    
    
    ;}
