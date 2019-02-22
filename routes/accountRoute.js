var express = require("express");
var router = express.Router();
var Account = require("../models/account");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// get a list of cities rom the db

router.get("/accounts", (req, res) => {
  console.log(req.params);
  Account.find({}).then(function(accounts) {
    res.send(accounts);
    console.log(accounts);
  });
});

// add a new city to the db

router.post("/accounts", (req, res) => {
  console.log(req.body);

  Account.findOne(
    {
      email: req.body.email
    },
    function(err, existingAccount) {
      console.log(existingAccount);
      if (err) throw err;
      if (existingAccount == null) {
        console.log("this is a new account, I will add it");
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const account = new Account({
              userName: req.body.userName,
              password: hash,
              email: req.body.email,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              country: req.body.country
            });
            Account.create(account).then(function(account) {
              res.send(account);
            });
          }
        });
      } else {
        console.log("account exists");
        res.json(null);
      }
    }
  );
});

module.exports = router;
