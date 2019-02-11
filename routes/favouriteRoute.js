var express = require("express");
var router = express.Router();
var Account = require("../models/account");
var Itinerary = require("../models/itinerary");
const checkItin = require("../middleware/check-itineraries");

router.post("/getfavourites", checkItin, (req, res) => {
  console.log("this should be the itineraries", req.itineraries);
  console.log("this should be req.body", req.body);
  let itineraries = req.itineraries;
  console.log("those itineraries though", itineraries);
});

// var itineraries = Account.findOne({ email: user.user }, function(
//   err,
//   account
// ) {
//   console.log("this is account.favourite", account.favourite);
//   var favourites = account.favourite;
//   console.log("this is favourites", favourites);
//   return favourites;
// }).then(favourites => {
//   console.log("can i still get faovurites", favourites);
// });

// Account.findOne({ email: user.user })
//   .exec()
//   .then(account => {
//     var itineraries = account.favourite;
//   })
//   .exec()
//   .then(itineraries => {
//     console.log("this should be the array of faouvrite", itineraries);
//   });
// });

// router.post("/getfavourites", (req, res) => {
//   let user = req.body;
//   let itineraryFullList = [];
//   Account.findOne({ email: user.user })
//     .then(account => {
//       var itineraries = account.favourite;
//       itineraries.forEach(itinerary => {
//         Itinerary.findById(itinerary, function(err, itineraryFull) {
//           if (err) {
//             console.log("this wasn't a match");
//           } else {
//             console.log("this is the actual itinerary", itineraryFull);
//             itineraryFullList.push(itineraryFull);
//             console.log("this is itineraryFullList array", itineraryFullList);
//           }
//         });
//       });
//       console.log(
//         "Do I have access to itineraryFullList here?",
//         itineraryFullList
//       );
//       res.send(itineraryFullList);
//     })
//     .catch(function(err) {
//       console.log(err);
//     });
// });

// router.post("/getfavourites", (req, res) => {
//   console.log("you've reached backend getfavourite route");
//   console.log("this should be email from req.body", req.body);

//   // first we find the right account
//   let user = req.body;
//   console.log("this is the the user", user);
//   Account.findOne({ email: user.user }).then(account => {
//     console.log("this is the account", account);
//     var itineraries = account.favourite;
//     console.log("these are the itineraries", itineraries);

//     let itineraryFullList = [];

//     itineraries.forEach(itinerary => {
//       console.log(itinerary);
//       Itinerary.findOne({ _id: itinerary }, function(err, itineraryFull) {
//         if (err) {
//           console.log("this wasn't a match");
//         } else {
//           itineraryFullList.push(itineraryFull);
//         }
//       });
//     });

//     console.log("this is itineraryFullList", itineraryFullList);

//     // Itinerary.find({ _id: { $all: itineraries } }).then(function(
//     //   itinerariesList
//     // ) {
//     //   console.log("these should be the itinerariesList", itinerariesList);
//     //   // res.send(itineraries);
//     // });
//   });
// });

// router.post("/getfavourites", (req, res) => {
//   console.log("you've reached backend getfavourite route");
//   console.log("this should be email from req.body", req.body);

//   // first we find the right account
//   let user = req.body;
//   console.log("this is the the user", user);
//   Account.findOne({ email: user.user }).then(account => {
//     console.log("this is the account", account);
//     var itineraries = account.favourite;
//     console.log("these are the itineraries", itineraries);
//     Itinerary.find({ _id: { $all: itineraries } }).then(function(
//       itinerariesList
//     ) {
//       console.log("these should be the itinerariesList", itinerariesList);
//       // res.send(itineraries);
//     });
//   });
// });

module.exports = router;
