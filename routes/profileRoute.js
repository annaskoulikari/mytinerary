const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const Account = require("../models/account");

router.post("/profiles", checkAuth, (req, res) => {
  let emailOfUser = req.body.emailOfUser;
  Account.find({ email: emailOfUser })
    .then(account => res.send(account))
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
