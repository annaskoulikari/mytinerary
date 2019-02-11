var express = require("express");
var router = express.Router();
var Itinerary = require("../models/itinerary");
const multer = require("multer");
var Account = require("../models/account");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// get a list of itineraries from the db

router.get("/itineraries/:city", (req, res) => {
  console.log(req.params);
  var cityIdentified = req.params.city;
  console.log(cityIdentified);
  Itinerary.find({ city: cityIdentified }).then(function(itineraries) {
    res.send(itineraries);
  });
});

// add a new itinerary to the db

router.post("/itineraries", upload.single("itineraryImage"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  const itinerary = new Itinerary({
    itineraryImage: req.file.path,
    profileName: req.body.profileName,
    title: req.body.title,
    likes: req.body.likes,
    hours: req.body.hours,
    expense: req.body.expense,
    hashtags: req.body.hashtags,
    city: req.body.city
  });
  Itinerary.create(itinerary).then(function(itinerary) {
    res.send(itinerary);
  });
});

// update an itinerary in the db

router.put("/itineraries:id", (req, res) => {
  res.send({ type: "PUT" });
});

// delete an itinerary from the db

router.delete("/itineraries:id", (req, res) => {
  res.send({ type: "DELETE" });
});

router.post("/itineraries/favourite", (req, res) => {
  // console.log(req);
  console.log("this is user from favourite", req.body.user);
  console.log("this is id from favourite", req.body.itineraryFavourite);
  res.send("you reached the favourite backend route!");

  Account.findOne({ email: req.body.user.email }).then(user => {
    console.log("favourites before adding", user.favourite);

    if (user.favourite.indexOf(req.body.itineraryFavourite) != -1) {
      console.log("this itinerary has already been liked");
    } else {
      Account.findOneAndUpdate(
        { email: req.body.user.email },
        { $push: { favourite: req.body.itineraryFavourite } },
        { upsert: true },
        function(err, updatedFavourites) {
          if (err) {
            console.log("error occured");
          } else {
            console.log(updatedFavourites);
          }
        }
      );
    }

    console.log("favourites after adding", user.favourite);
  });
});

module.exports = router;
