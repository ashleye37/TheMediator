var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2");
var User = require("../models/user-model.js");
var Sequelize = require("sequelize");
var bCrypt = require("bcrypt-nodejs");

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
  clientID: "745284407478-76oas8emi71h9t27idjf4p6419t1d35s.apps.googleusercontent.com",
  clientSecret: "PH-P51NHpmLdYMU6jbcJziZu"
},(accessToken, refreshToken, profile, done) => {
  // check if user already exists in the db
  User.findOne({
    where: {
      googleId: profile.id}
    }).then((currentUser) => {
    if(currentUser) {
      // already have user
      console.log("User is: " + currentUser);
      done(null, currentUser);
    } else {
      // if not, create new user in db
      var user = {
        username: profile.displayName,
        googleId: profile.id,
        thumbnail: profile._json.image.url
      };
      User.create(user).then((newUser) => {
        console.log("New user created: " + newUser);
        done(null, newUser);
      });
    }
  });
}));