var express = require("express");
var router = express.Router();
var Comment = require("../models/comment");

// get a list of cities rom the db

router.get("/comments/:itinerary_id", (req, res) => {
  console.log(req.params);
  var itineraryIdentified = req.params.itinerary_id;
  Comment.find({ itinerary_id: itineraryIdentified }).then(function(comments) {
    res.send(comments);
    console.log(comments);
  });
});

// add a new city to the db

router.post("/comments", (req, res) => {
  console.log(req.body);
  const comment = new Comment({
    comment: req.body.comment,
    user: req.body.user,
    itinerary_id: req.body.itinerary_id
  });
  Comment.create(comment).then(function(comment) {
    res.send(comment);
  });
});

// update a city in the db

// router.put("/:id", (req, res) => {
//   res.send({ type: "PUT" });
// });

// // delete a city from the db

// router.delete("/:id", (req, res) => {
//   res.send({ type: "DELETE" });
// });

module.exports = router;
