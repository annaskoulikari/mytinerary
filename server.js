var routerTest = require("./routes/test");
var routerItinerary = require("./routes/itineraryRoute");
var routerActivity = require("./routes/activityRoute");
var routerComment = require("./routes/commentRoute");

console.log("server is starting");

var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
//var cors = require("cors");
//var ObjectID = require("mongodb").ObjectID;

var app = express();

// app.use(cors());

app.use(express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb://user_1:1Greecepuppy@ds013559.mlab.com:13559/mytinerary",
  { useNewUrlParser: true, useCreateIndex: true }
);

mongoose.Promise = global.Promise;

app.use("/itinerary/uploads", express.static("uploads"));
app.use("/activity/uploads", express.static("uploads"));

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
app.use("/testItinerary", routerItinerary);
app.use("/testActivity", routerActivity);
app.use("/testComment", routerComment);

app.listen(port, () => console.log(`server running on port ${port}`));
