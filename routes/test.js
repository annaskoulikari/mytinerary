var express = require("express");
var router = express.Router();
var City = require("../models/city");

// get a list of cities rom the db

router.get("/", (req, res) => {
  City.find({}).then(function(cities) {
    console.log(req);
    res.send(cities);
    console.log(cities);
  });
});

// add a new city to the db

router.post("/", (req, res) => {
  console.log(req.body);
  const city = new City(req.body);
  City.create(city).then(function(city) {
    res.send(city);
  });
});

// update a city in the db

router.put("/:id", (req, res) => {
  res.send({ type: "PUT" });
});

// delete a city from the db

router.delete("/:id", (req, res) => {
  res.send({ type: "DELETE" });
});

module.exports = router;
