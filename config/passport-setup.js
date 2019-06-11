var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");
var keys = require("./keys.js");
var User = require("../models/user-model.js");

passport.use(new GoogleStrategy({
  // options for strategy
  callbackURL: "/auth/google/redirect",
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret
},(accessToken, refreshToken, profile, done) => {
  // passport callback function
  console.log("Passport callback function fired");
  console.log(profile);
  new User({
    username: profile.displayName,
    googleId: profile.id
  }).save().then((newUser) => {
    console.log("New user created: " + newUser);
  })
})
);