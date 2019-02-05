var express = require("express");
var router = express.Router();
var Comment = require("../models/comment");
const checkAuth = require("../middleware/check-auth");
const jwt = require("jsonwebtoken");

router.post("/profiles", checkAuth, (req, res) => {
  console.log("this is req.body", req.body);
  console.log("this is again decoded", req.decoded);
  let userInfo = req.decoded;
  res.send(userInfo);
});

module.exports = router;
