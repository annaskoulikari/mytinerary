var express = require("express");
var router = express.Router();
var Account = require("../models/account");
var Itinerary = require("../models/itinerary");
const checkItin = require("../middleware/check-itineraries");

router.post("/getfavourites", (req, res) => {
  let user = req.body.user;

  Account.findOne({ email: user })
    .then(account => {
      let itineraries = account.favourite;
      console.log(account.favourite);
      // res.status(200).send(itineraries);
      console.log("these ar the itineraries", itineraries);
      return itineraries;
    })
    .then(itineraries => {
      Itinerary.find({ _id: { $in: itineraries } }).then(itinerariesFull => {
        console.log("these are the itinerariesFull", itinerariesFull);
        res.status(200).send(itinerariesFull);
        return itinerariesFull;
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/getFavouriteItinerary", (req, res) => {
  console.log("this should be the id", req.body.id);
  Itinerary.find({ _id: { $in: req.body.id } }).then(itineraries => {
    res.send(itineraries);
  });
});

router.post("/deleteFavourite", (req, res) => {
  console.log("this is req.body of delete route", req.body);
  console.log("this should be the id to delete", req.body.id);
  Account.findOneAndUpdate(
    { email: req.body.user.email },
    { $pull: { favourite: req.body.id } },
    { upsert: true }
  )
    .then(account => {
      var newFavourites = account.favourite;
      res.status(200).send(newFavourites);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
