var express = require("express");
var router = express.Router();
var Account = require("../models/account");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", (req, res, next) => {
  console.log("IN TO LOG IN", req.body.email);
  Account.find({ email: req.body.email })
    .exec()
    .then(account => {
      if (account.length < 1) {
        return res.status(401).json({
          message: "Auth failed1"
        });
      }
      console.log(account);
      bcrypt.hash(req.body.password, account[0].password, (err, hash) => {
        console.log(err);
        console.log(hash);
        if (err) {
          return res.status(401).json({
            message: "Auth failed2"
          });
        }
        if (hash) {
          const token = jwt.sign(
            {
              email: account[0].email,
              accountId: account[0]._id,
              name: account[0].firstName + " " + account[0].lastName
            },
            process.env.JWT_KEY,
            {
              expiresIn: "24h"
            }
            // (err, token) => {
            //   res.send({ token: token });
            // }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token,
            profilePhoto: account[0].profilePhoto,
            userName: account[0].userName,
            password: account[0].password,
            email: account[0].email,
            firstName: account[0].firstName,
            lastName: account[0].lastName,
            country: account[0].country
          });
        }
        res.status(401).json({
          message: "Auth failed3"
        });
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
