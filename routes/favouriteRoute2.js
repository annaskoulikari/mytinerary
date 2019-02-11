var express = require("express");
var router = express.Router();
var Account = require("../models/account");
var Itinerary = require("../models/itinerary");
const checkItin = require("../middleware/check-itineraries");

// router.post("/getfavourites", (req, res) => {
//   let user = req.body.user;

//   Account.findOne({ email: user }).then(account => {
//     console.log(account.favourite);
//     res.status(200).send(account.favourite);
//   });
// });

router.post("/getfavourites", (req, res) => {
  let user = req.body.user;

  Account.findOne({ email: user })
    .then(account => {
      let itineraries = account.favourite;
      console.log(account.favourite);
      res.status(200).send(itineraries);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// router.post("/getFavouriteItinerary", (req, res) => {
//   console.log("this should be the id", req.body.id);
//   Itinerary.findById(req.body.id).then(itinerary => {
//     res.send(itinerary);
//   });
// });

// router.post("/getFavouriteItinerary", (req, res) => {
//   console.log("this should be the id", req.body.id);
//   Itinerary.find({ _id: { $all: req.body.id } }).then(itineraries => {
//     res.send(itineraries);
//   });
// });

router.post("/getFavouriteItinerary", (req, res) => {
  console.log("this should be the id", req.body.id);
  Itinerary.find({ _id: { $in: req.body.id } }).then(itineraries => {
    res.send(itineraries);
  });
});

// router.post("/getFavouriteItinerary", (req, res) => {
//     console.log("this should be the id", req.body.id);
//     // Itinerary.find({ _id: { $all: req.body.id } }).then(itineraries => {
//     //   res.send(itineraries);
//     // });
//     let itineraries = req.body.id;

//     let itinerariesArray = [];

//     itineraries.forEach(itinerary => {
//       Itinerary.findById(itinerary, function(err, itineraryFull) {
//         if (err) {
//           console.log("this wasn't a match");
//         } else {
//           console.log("this is the actual itinerary", itineraryFull);
//           itinerariesArray.push(itineraryFull);
//           console.log("this is itineraryFullList array", itinerariesArray);
//         }
//       })
//     });

//   });

router.post("/deleteFavourite", (req, res) => {
  console.log("this is req.body of delete route", req.body);
  console.log("this should be the id to delete", req.body.id);

  Account.findOne({ email: req.body.user.email }).then(user => {
    console.log("favourites before deleting", user.favourite);

    if (user.favourite.indexOf(req.body.id) != -1) {
      Account.findOneAndUpdate(
        { email: req.body.user.email },
        { $pull: { favourite: req.body.id } },
        { upsert: true },
        function(err, updatedFavourites) {
          if (err) {
            console.log("error occured");
          } else {
            console.log(updatedFavourites);
            console.log("this is new faouvirte array", user.favourite);
          }
        }
      );
    } else {
      console.log("this itinerary wans't found in the array?");
    }

    // console.log("favourites after adding", user.favourite);
  });

  res.send("yup you reached the delete route");
});

module.exports = router;
