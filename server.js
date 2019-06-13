require("dotenv").config();
var authRoutes = require("./routes/auth-routes");
var profileRoutes = require("./routes/profile-routes");
var passportSetup = require("./config/passport-setup");
// var keys = require("./config/keys");
var db = require("./models");
var env = require('dotenv');

var express = require("express");
var exphbs = require("express-handlebars");
// var cookieSession = require("cookie-session");

var app = express();
var PORT = process.env.PORT || 3000;

var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Using auth-routes.
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// create home route
app.get('/', function(req, res) {
  res.send('Welcome to Passport with Sequelize');
});

app.listen(PORT, function(err) {
  if (!err)
      console.log("Site is live");
  else console.log(err)
});

// // Managing cookie session.
// app.use(cookieSession({
//   maxAge: 24 * 60 * 60 * 1000,
//   keys:[keys.session.cookieKey]
// }));

// Initialize passport
// app.use(session({ secret: keys.session.cookieKey,resave: true, saveUninitialized:true})); // session secret
// app.use(passport.initialize());
// app.use(passport.session());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
