var express = require("express");
var router = express.Router();
var Comment = require("../models/comment");
const checkAuth = require("../middleware/check-auth");
const jwt = require("jsonwebtoken");

var Account = require("../models/account");

router.post("/profiles", checkAuth, (req, res) => {
  let userInfo = req.decoded;
  let emailOfUser = req.body.emailOfUser;
  Account.find({ email: emailOfUser }).then(account => res.send(account));
  // res.send(userInfo);
});

// router.post("/profiles", (req, res) => {
//   console.log("let's look at req.body object", req.body);
//   let emailOfUser = req.body.emailOfUser;
//   console.log("this should be email from req.emailOfUser", emailOfUser);

//   // res.send(userInfo);
// });

module.exports = router;
