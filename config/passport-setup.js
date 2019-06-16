var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var db = require("../models");

module.exports = function(passport) {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null,user);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: "745284407478-76oas8emi71h9t27idjf4p6419t1d35s.apps.googleusercontent.com",
        clientSecret: "PH-P51NHpmLdYMU6jbcJziZu",
        callbackURL: "http://localhost:3000/auth/google/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        db.User.findOrCreate({where: { 
          googleId: profile.id, 
          username: profile.displayName, 
          thumbnail: profile._json.picture} })
        .then(function() {
          return done(null, {
            profile: profile,
            token: accessToken
          });
        });
      }
    )
  );
};