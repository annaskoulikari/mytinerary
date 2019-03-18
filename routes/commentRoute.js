const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const checkAuth = require("../middleware/check-auth");
const jwt = require("jsonwebtoken");

// get a list of cities rom the db

router.post("/commentsAll", (req, res) => {
  let itinerariesArray = req.body.itinerariesArray;
  console.log("this should be array of itineraries", itinerariesArray);
  Comment.find({ itinerary_id: { $in: itinerariesArray } })
    .then(function(comments) {
      res.send(comments);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

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
  Comment.create(comment)
    .then(
      Comment.find({ itinerary_id: { $in: itinerariesArray } }).then(function(
        comments
      ) {
        res.send(comments);
      })
    )
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
