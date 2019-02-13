var express = require("express");
var router = express.Router();
var Comment = require("../models/comment");
const checkAuth = require("../middleware/check-auth");
const jwt = require("jsonwebtoken");

// get a list of cities rom the db

router.post("/commentsAll", (req, res) => {
  var itinerariesArray = req.body.itinerariesArray;
  console.log("this should be array of itineraries", itinerariesArray);
  Comment.find({ itinerary_id: { $in: itinerariesArray } }).then(function(
    comments
  ) {
    res.send(comments);
    //console.log(comments);
  });
});

// router.get("/comments/:itinerary_id", (req, res) => {
//   console.log(req.params);
//   var itineraryIdentified = req.params.itinerary_id;
//   Comment.find({ itinerary_id: itineraryIdentified }).then(function(comments) {
//     res.send(comments);
//     //console.log(comments);
//   });
// });

// the checkAuth way

router.post("/comments", checkAuth, (req, res) => {
  console.log("this is req.body", req.body);
  console.log("this is again decoded", req.decoded);
  let userInfo = req.decoded;
  let itinerariesArray = req.body.itinerariesArray;
  const comment = new Comment({
    comment: req.body.comment,
    user: userInfo.name,
    itinerary_id: req.body.itinerary_id
  });
  Comment.create(comment).then(
    Comment.find({ itinerary_id: { $in: itinerariesArray } }).then(function(
      comments
    ) {
      res.send(comments);
    })
  );
});

// router.post("/comments", checkAuth, (req, res) => {
//   console.log("this is req.body", req.body);
//   console.log("this is again decoded", req.decoded);
//   let userInfo = req.decoded;
//   //res.json({ userInfo });
//   const comment = new Comment({
//     comment: req.body.comment,
//     user: userInfo.name,
//     itinerary_id: req.body.itinerary_id
//   });
//   Comment.create(comment).then(function(comment) {
//     res.send(comment);
//   });
// });

module.exports = router;

// The Traversy Media Way Begin

// verify token

// function verifyToken(req, res, next) {
//   console.log(req.headers.authorization);
//   console.log(req.headers["authorization"]);
//   //Get auth header
//   const bearerHeader = req.headers["authorization"];
//   // check if bearer is undefined
//   if (typeof bearerHeader !== "undefined") {
//     //split at the space
//     const bearer = bearerHeader.split(" ");
//     //get token from array
//     const bearerToken = bearer[1];
//     //set the token
//     req.token = bearerToken;
//     console.log("token from verifyToken function", req.token);
//     //next middleware
//     next();
//   } else {
//     //Forbidden
//     res.sendStatus(403);
//   }
// }

// //new version of route

// router.post("/comments", verifyToken, (req, res) => {
//   console.log(req.token);
//   jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         message: "comment created",
//         authData
//       });
//       const comment = new Comment({
//         comment: req.body.comment,
//         user: req.body.user,
//         itinerary_id: req.body.itinerary_id
//       });
//       Comment.create(comment).then(function(comment) {
//         res.send(comment);
//       });
//     }
//   });
// });

// module.exports = router;

// The Traversy Media Way End

//the original post route

// router.post("/comments", (req, res) => {
//   console.log(req.headers.authorization);
//   const comment = new Comment({
//     comment: req.body.comment,
//     user: req.body.user,
//     itinerary_id: req.body.itinerary_id
//   });
//   Comment.create(comment).then(function(comment) {
//     res.send(comment);
//   });
// });

// module.exports = router;
