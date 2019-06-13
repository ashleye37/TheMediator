var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2");
var keys = require("./keys.js");
var User = require("../models/user-model.js");
var Sequelize = require("sequelize");

// serializing user using passport.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserializing and find user in database.
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(new GoogleStrategy({
  // options for strategy
  callbackURL: "/auth/google/redirect",
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret
},(accessToken, refreshToken, profile, done) => {
  // check if user already exists in the db
  User.findOne({googleId: profile.id}).then((currentUser) => {
    if(currentUser) {
      // already have user
      console.log("User is: " + currentUser);
      done(null, currentUser);
    } else {
      // if not, create new user in db
      new User({
        username: profile.displayName,
        googleId: profile.id,
        thumbnail: profile._json.image.url
      }).save().then((newUser) => {
        console.log("New user created: " + newUser);
        done(null, newUser);
      });
    }
  });
}));