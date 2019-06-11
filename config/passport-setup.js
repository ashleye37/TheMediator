var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2");

passport.use(new GoogleStrategy({
  // options for strategy
}),() => {
  // passport callback function
}
)