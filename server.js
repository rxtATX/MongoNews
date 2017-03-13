var express = require("express");
var app = express();

var path = require("path");
app.use(express.static(path.join(__dirname, "/public/")));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/controllers.js");
app.use("/", routes);

var mongoose = require("mongoose");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;
// Database configuration with mongoose
mongoose.connect("mongodb://heroku_qk1td2p1:ov6l4deofcb3o2kkcsmunaljq2@ds123370.mlab.com:23370/heroku_qk1td2p1");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

var PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});