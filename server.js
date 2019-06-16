require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var passport = require("passport");

// Cookie packages
var cookieParser = require("cookie-parser");
var cookieSession = require("cookie-session");

// Require models for use in app
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Setting up passport for use.
require("./config/passport-setup")(passport);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(express.static("public"));

// Register cookie packages as middleware
app.use(
  cookieSession({
    name: "session",
    keys: ["123"]
  })
);
app.use(cookieParser());

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
require("./routes/auth-routes")(app);
 

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
