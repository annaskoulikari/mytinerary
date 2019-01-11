var express = require("express");
var router = express.Router();
var Activity = require("../models/activity");

const multer = require("multer");

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

router.get("/activities/:_id", (req, res) => {
  console.log(req.params);
  var itineraryIdentified = req.params._id;
  console.log(itineraryIdentified);
  Activity.find({ itinerary_id: itineraryIdentified }).then(function(
    activities
  ) {
    res.send(activities);
  });
});

// add a new itinerary to the db

router.post("/activities", upload.single("activityImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const activity = new Activity({
    name: req.body.name,
    itineraryItem: req.body.itineraryItem,
    city: req.body.city,
    itinerary_id: req.body.itinerary_id,
    activityImage: req.file.path
  });
  Activity.create(activity).then(function(activity) {
    res.send(activity);
  });
});

// update an itinerary in the db

router.put("/activities:id", (req, res) => {
  res.send({ type: "PUT" });
});

// delete an itinerary from the db

router.delete("/activities:id", (req, res) => {
  res.send({ type: "DELETE" });
});

module.exports = router;
