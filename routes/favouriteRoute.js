var express = require("express");
var router = express.Router();
var Account = require("../models/account");
var Itinerary = require("../models/itinerary");
const checkItin = require("../middleware/check-itineraries");

router.post("/getfavourites", (req, res) => {
  let user = req.body.user.email;
  console.log("let this be user of getfavourites back end", user);

  Account.findOne({ email: user })
    .then(account => {
      let itineraries = account.favourite;

      return itineraries;
    })
    .then(itineraries => {
      Itinerary.find({ _id: { $in: itineraries } }).then(itinerariesFull => {
        res.status(200).send(itinerariesFull);
        return itinerariesFull;
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/deleteFavourite", (req, res) => {
  Account.findOneAndUpdate(
    { email: req.body.user.email },
    { $pull: { favourite: req.body.id } },
    { upsert: true }
  )

    .then(account => {
      let favouriteArray = [];
      let oldArray = account.favourite;
      oldArray.forEach(item => {
        if (item != req.body.id) {
          favouriteArray.push(item);
        }
      });

      return favouriteArray;
    })
    .then(favouriteArray => {
      Itinerary.find({ _id: { $in: favouriteArray } }).then(itinerariesFull => {
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

module.exports = router;
