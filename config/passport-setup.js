var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2");
var router = require("../routes/auth-routes");
var User = require("../models/user-model.js");
var db = require("../models");
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
  }, (accessToken, refreshToken, profile, done) => {
    // check if user already exists in the db
    db.User.findOne({
      where: {
        googleId: profile.id
      } 
    }).then((user) => {
      if (user) {
        // already have user
        console.log("User is: " + user);
        done(null, user);
      } else {
        // if not, create new user in db
        var user = {
          username: profile.displayName,
          googleId: profile.id,
          thumbnail: profile._json.image.url
        };
        db.User.create(user).then(function(data) {
          console.log("New user created: " + user);
          done(null, newUser);
          res.redirect("/");
        });
      }
    });
  }));