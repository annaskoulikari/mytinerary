var routerTest = require("./routes/test");

console.log("server is starting");

var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
//var ObjectID = require("mongodb").ObjectID;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb://user_1:1Greecepuppy@ds013559.mlab.com:13559/mytinerary",
  { useNewUrlParser: true }
);

mongoose.Promise = global.Promise;

mongoose.connection
  .once("open", function() {
    console.log("Connection has been made, now make fireworks...");
  })
  .on("error", function(error) {
    console.log("Connection error:", error);
  });

var port = process.env.PORT || 5000;

// app.get("/", (req, res) => res.send("HELLO WORLD"));

// var router = express.Router();

app.get("/test", function(req, res) {
  res.send("Hello World");
});

app.use("/testRouter", routerTest);

app.listen(port, () => console.log(`server running on port ${port}`));
